import { t } from '@lingui/macro'
import { Button, Popconfirm, Tag, Typography } from 'antd'
import { format } from 'date-fns'
import React, { useEffect } from 'react'
import { DeliveryState } from '../../api/book/interface'
import { IDelivery } from '../../api/delivery/delivery'
import { RoleState } from '../../api/user/interface'
import ListTable from '../../component/ListTable/ListTable'
import { getDeliveries, updateDeliveryState } from '../../redux/actions/delivery/delivery'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { deliveriesSelectors } from '../../redux/reducer/delivery/deliveryReducer'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { userSelectors } from '../../redux/reducer/user/userReducer'

const Delivery: React.FC = () => {
  const dispatch = useAppDispatch()
  const deliveries = useAppSelector(deliveriesSelectors.deliveriesSelector)
  const user = useAppSelector(userSelectors.userInfoSelector)

  useEffect(() => {
    dispatch(setCurrentPage('Delivery'))
    dispatch(getDeliveries())
  }, [dispatch])

  const handleShipping = (record: IDelivery) => {
    if (record.state === DeliveryState.Shipping) {
      return
    }
    dispatch(updateDeliveryState({ id: record.id, state: DeliveryState.Shipping }))
  }

  const handleWaiting = (record: IDelivery) => {
    if (record.state === DeliveryState.Waiting) {
      return
    }
    dispatch(updateDeliveryState({ id: record.id, state: DeliveryState.Waiting }))
  }

  const handleDone = (record: IDelivery) => {
    dispatch(updateDeliveryState({ id: record.id, state: DeliveryState.Done }))
  }

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
      title: t`Phone`,
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: t`Address`,
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: t`Status`,
      dataIndex: 'state',
      key: 'state',
      render: (text: DeliveryState) => (
        <Tag
          color={
            (text === DeliveryState.Waiting && '#2db7f5') ||
            (text === DeliveryState.Shipping && '#108ee9') ||
            (text === DeliveryState.Done && '#87d068') ||
            '#f50'
          }
        >
          {text}
        </Tag>
      )
    },
    {
      title: t`Created At`,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => <div>{text && format(new Date(text), 'MM/dd/yyyy hh:mm:ss')}</div>
    },
    {
      title: t`Updated At`,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => <div>{text && format(new Date(text), 'MM/dd/yyyy hh:mm:ss')}</div>
    },
    {
      key: 'action',
      render: (record: IDelivery) =>
        user.role === RoleState.Shipper &&
        record.state !== DeliveryState.Done && (
          <div className="button-box">
            <Popconfirm
              title="Are you sure to change status to Waiting?"
              onConfirm={() => handleWaiting(record)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type={(record.state === DeliveryState.Waiting && 'primary') || 'default'}
                // disabled={[DeliveryState.Done, DeliveryState.Waiting].includes(record.state)}
              >
                Waiting
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure to change status to Shipping?"
              onConfirm={() => handleShipping(record)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type={(record.state === DeliveryState.Shipping && 'primary') || 'default'}
                // disabled={[DeliveryState.Done, DeliveryState.Shipping].includes(record.state)}
              >
                Shipping
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure to change status to Done?"
              onConfirm={() => handleDone(record)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button>Done</Button>
            </Popconfirm>
          </div>
        )
    }
  ]

  return (
    <div className="book-wrapper">
      <div className="heading">
        <Typography className="heading-title">Delivery List</Typography>
      </div>
      <ListTable
        title="List Of Delivery"
        dataSource={deliveries}
        columns={columns}
        scroll={{ x: 'auto' }}
        pagination={false}
      />
    </div>
  )
}

export default Delivery
