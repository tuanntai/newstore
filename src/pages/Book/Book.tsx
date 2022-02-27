import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography, Modal, notification } from 'antd'

import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import ListTable from '../../component/ListTable/ListTable'
import './Book.less'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { bookSelectors, setBookId } from '../../redux/reducer/book/bookReducer'
import { deleteBookById, getList } from '../../redux/actions/book/book'
import { format } from 'date-fns'

const Book: React.FC = () => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const listBook = useAppSelector(bookSelectors.bookListSelector)
  const bookId = useAppSelector(bookSelectors.bookIdSelector)

  useEffect(() => {
    dispatch(setCurrentPage('Book'))
  }, [dispatch])
  const [searchKey, setSearchKey] = useState('')
  useEffect(() => {
    dispatch(getList({ search: searchKey, size: 100, page: 0 }))
  }, [dispatch, searchKey])

  const handleBuy = (id: number) => {
    dispatch(setBookId(id))
    setShowModal(!showModal)
  }

  const handleEdit = (id: number) => {
    dispatch(setBookId(id))
    navigate(`edit-book/${id}`)
  }

  const deleteBook = (id: number) => {
    dispatch(deleteBookById(id))
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)
    setShowEditModal(false)
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
      title: t`Description`,
      dataIndex: 'description',
      key: 'description'
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
      title: t`Action`,
      dataIndex: 'action',
      key: 'action',
      width: '120px',
      render: (record: any, action: any) => (
        <div className="button-box">
          <Button
            className="edit-button"
            type="primary"
            onClick={() => {
              navigate(`${action.id}`)
              dispatch(setBookId(action.id))
            }}
          >
            Detail
          </Button>
          <Button className="delete-button" onClick={() => handleBuy(action.id)}>
            Buy
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="book-wrapper">
      <div className="heading">
        <Typography className="heading-title">Book List</Typography>
        <Link to="create-book">
          <Button type="primary" icon={<PlusOutlined />}>
            Create Book
          </Button>
        </Link>
      </div>
      <ListTable
        title="List Of Book"
        dataSource={listBook}
        pagination={false}
        columns={pinnedColumn}
        scroll={{ x: 1200 }}
      />

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
        // title={`Edit Book Id ${bookId}`}
        visible={showEditModal}
        // onOk={() => deleteBook(bookId)}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Submit"
      >
        Are you sure ?
      </Modal>
    </div>
  )
}

export default Book
