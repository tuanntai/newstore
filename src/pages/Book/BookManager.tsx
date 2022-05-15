import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { Button, Typography, Modal, Input, Select, Pagination } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import ListTable from '../../component/ListTable/ListTable'
import './Book.less'
import { useNavigate } from 'react-router'
import { bookSelectors, setBookId } from '../../redux/reducer/book/bookReducer'
import { deleteBookById, getList } from '../../redux/actions/book/book'
import { format } from 'date-fns'
import { EBookStatus, EOrder, IBook } from '../../api/book/interface'
import { FAKE_LIST, ORDER_TYPE } from '../HomePage/HomePage'
import { getUserIdLocal } from '../../utils/localStorageService'
import { userSelectors } from '../../redux/reducer/user/userReducer'
import { RoleState } from '../../api/user/interface'
const { Search } = Input
const { Option } = Select
const BookManager: React.FC = () => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const listBook = useAppSelector(bookSelectors.bookListSelector)
  const bookId = useAppSelector(bookSelectors.bookIdSelector)
  const [status, setStatus] = useState<EBookStatus>(EBookStatus.ALL)
  const [order, setOrder] = useState<EOrder>(EOrder.DESC)
  const userId = getUserIdLocal()
  const user = useAppSelector(userSelectors.userInfoSelector)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)

  useEffect(() => {
    dispatch(setCurrentPage('Book'))
  }, [dispatch])
  const [searchKey, setSearchKey] = useState('')
  useEffect(() => {
    dispatch(getList({ search: searchKey, page: page - 1, size, status, order }))
  }, [dispatch, searchKey, order, status, page, size])
  const pagePagination = useAppSelector(bookSelectors.pagePaginationBookSelector)

  const deleteBook = (id: string) => {
    dispatch(deleteBookById(id))
    setShowModal(!showModal)
  }

  function onShowSizeChange(current: any) {
    setPage(current)
  }

  const onShowPageSizeChange = (cur: any, size: any) => {
    setSize(cur)
  }

  const handleCancel = () => {
    setShowModal(false)
    setShowEditModal(false)
  }

  function handleChange(value: any) {
    setStatus(value)
  }

  function handleOrderChange(value: EOrder) {
    setOrder(value)
  }

  const pinnedColumn = [
    {
      title: t`ID`,
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: string) => <div key={text}>{text}</div>
    },
    {
      title: t`Title`,
      dataIndex: 'title',
      key: 'title'
    },

    {
      title: t`Image`,
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text: string, action: any) => (
        <div className="thumbnail-box">{text && <img alt={`img${action.id}`} src={text} />}</div>
      )
    },
    {
      title: t`startTime`,
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => <div>{format(new Date(text), 'MM/dd/yyyy hh:mm:ss')}</div>
    },
    {
      title: t`buyTime`,
      dataIndex: 'buyTime',
      key: 'buyTime',
      render: (text: string) => <div>{text && format(new Date(text), 'MM/dd/yyyy hh:mm:ss')}</div>
    },
    {
      title: t`buyerId`,
      dataIndex: 'buyerId',
      key: 'buyerId'
    },
    {
      title: t`Delivery State`,
      dataIndex: 'deliveryState',
      key: 'deliveryState'
    },
    {
      title: t`Action`,
      dataIndex: 'action',
      key: 'action',
      width: '120px',
      render: (_: any, record: IBook) => (
        <div className="button-box">
          <Button
            className="edit-button"
            type="primary"
            onClick={() => {
              navigate(`/book/${record.id}`)
              dispatch(setBookId(record.id))
            }}
          >
            Detail
          </Button>
          <Button className="delete-button" onClick={() => navigate(`edit/${record.id}`)}>
            Edit
          </Button>
          <Button className="delete-button" onClick={() => setShowModal}>
            Delete
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="book-wrapper">
      <div className="heading">
        <Typography className="heading-title">Book List</Typography>
      </div>
      <Search
        placeholder="Enter What You Need ?"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={setSearchKey}
      />
      <div className="filter-box">
        <div>
          <div>Status: </div>
          <Select defaultValue={EBookStatus.ALL} style={{ width: 120 }} onChange={handleChange}>
            {FAKE_LIST.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <div>Order: </div>
          <Select defaultValue={EOrder.DESC} style={{ width: 120 }} onChange={handleOrderChange}>
            {ORDER_TYPE.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <ListTable
        title="List Of Book"
        dataSource={
          user.role === RoleState.Admin
            ? listBook
            : listBook.filter((item) => item.ownerId === userId)
        }
        pagination={false}
        columns={pinnedColumn}
        scroll={{ x: 1200 }}
      />
      <div className="pagination">
        {pagePagination.totalPages > 1 && (
          <Pagination
            onChange={onShowSizeChange}
            onShowSizeChange={onShowPageSizeChange}
            defaultCurrent={page}
            total={pagePagination.totalItems}
          />
        )}
      </div>

      <Modal
        title={`Delete Book Id ${bookId}`}
        visible={showModal}
        onOk={() => deleteBook(bookId)}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Delete"
      >
        Are you sure ?
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={`Edit Book Id ${bookId}`}
        visible={showEditModal}
        onOk={() => deleteBook(bookId)}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Submit"
      >
        Are you sure ?
      </Modal>
    </div>
  )
}

export default BookManager
