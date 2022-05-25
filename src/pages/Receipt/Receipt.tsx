import { t } from '@lingui/macro'
import { Typography } from 'antd'
import { format } from 'date-fns'
import React, { useEffect } from 'react'
import { IUserInfo, RoleState } from '../../api/user/interface'
import ListTable from '../../component/ListTable/ListTable'
import {
  getReceipts,
  getReceiptsByBuyer,
  getReceiptsBySeller
} from '../../redux/actions/receipt/receipt'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { receiptsSelectors } from '../../redux/reducer/receipt/receiptReducer'
import { userSelectors } from '../../redux/reducer/user/userReducer'
import { getUserIdLocal } from '../../utils/localStorageService'

const columns = [
  {
    title: t`ID`,
    dataIndex: 'id',
    key: 'id',
    sorter: (a: any, b: any) => a.id - b.id,
    render: (text: string) => <div key={text}>{text}</div>
  },
  {
    title: t`Book Id`,
    dataIndex: 'bookId',
    key: 'bookId'
  },
  {
    title: t`Price`,
    dataIndex: 'price',
    key: 'price',
    render: (text: string) => `${text} $`
  },
  {
    title: t`buyTime`,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text: string) => <div>{text && format(new Date(text), 'MM/dd/yyyy hh:mm:ss')}</div>
  },
  {
    title: t`buyer`,
    dataIndex: 'buyer',
    key: 'buyer',
    render: (buyer: IUserInfo) => buyer && buyer.username
  },
  {
    title: t`sellerId`,
    dataIndex: 'seller',
    key: 'seller',
    render: (seller: IUserInfo) => seller && seller.username
  }
]

const Receipt: React.FC = () => {
  const dispatch = useAppDispatch()
  const receipts = useAppSelector(receiptsSelectors.receiptsSelector)
  const sellerReceipts = useAppSelector(receiptsSelectors.receiptsBySellerSelector)
  const buyerReceipts = useAppSelector(receiptsSelectors.receiptsByBuyerSelector)
  const user = useAppSelector(userSelectors.userInfoSelector)
  const userId = getUserIdLocal()
  console.log({ receipts })
  console.log({ sellerReceipts })

  useEffect(() => {
    dispatch(setCurrentPage('Receipt'))
    dispatch(getReceipts())
    dispatch(getReceiptsBySeller(userId))
    dispatch(getReceiptsByBuyer(userId))
  }, [dispatch, userId])

  return (
    <div className="book-wrapper">
      <div className="heading">
        <Typography className="heading-title">Receipt List</Typography>
      </div>
      {user.role === RoleState.Admin && (
        <ListTable
          title="List Of Receipts"
          dataSource={receipts}
          columns={columns}
          scroll={{ x: 'auto' }}
          pagination={false}
        />
      )}

      {user.role === RoleState.User && (
        <ListTable
          title="List Of Sell Receipts"
          dataSource={sellerReceipts}
          pagination={false}
          columns={columns}
          scroll={{ x: 'auto' }}
        />
      )}

      {user.role === RoleState.User && (
        <ListTable
          title="List Of Buy Receipts"
          dataSource={buyerReceipts}
          pagination={false}
          columns={columns}
          scroll={{ x: 'auto' }}
        />
      )}
    </div>
  )
}

export default Receipt
