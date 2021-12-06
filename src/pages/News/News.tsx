import { t } from '@lingui/macro'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography, Table, Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteNewsById, getPinnedNews, getPublished } from '../../redux/actions/news/news'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { newsSelector, setNewsId } from '../../redux/reducer/news/newsReducer'
import { IPinnedNews } from '../../api/news/interface'
import './News.less'

const News: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const pinnedNewsList = useAppSelector(newsSelector.pinnedNewsSelector)
  const publishedNewsList = useAppSelector(newsSelector.publishedSelector)
  const newsId = useAppSelector(newsSelector.newsIdSelector)
  const errorMessage = useAppSelector(newsSelector.newsErrorSelector)
  const progress = useAppSelector(newsSelector.newsProgressSelector)

  useEffect(() => {
    dispatch(setCurrentPage('News'))
    dispatch(getPublished())
    dispatch(getPinnedNews())
  }, [dispatch])

  useEffect(() => {
    if (progress === false && errorMessage) {
      notification.error({
        message: errorMessage,
        placement: 'topRight'
      })
    } else if (progress)
      notification.success({
        message: `Successfully`,
        placement: 'topRight'
      })
  }, [progress, errorMessage])

  const handleDelete = (id: number) => {
    dispatch(setNewsId(id))
    setShowModal(!showModal)
  }

  const deleteNews = (id: number) => {
    dispatch(deleteNewsById(id))
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(!showModal)
  }

  const handleCreate = () => {
    navigate('create-news')
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
      title: t`Tittle`,
      dataIndex: 'tittle',
      key: 'tittle'
    },
    {
      title: t`Excerpt`,
      dataIndex: 'excerpt',
      key: 'excerpt'
    },
    {
      title: t`Thumbnail`,
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (text: string) => <img alt={text} src={text} />
    },
    {
      title: t`Action`,
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      render: (record: any, action: IPinnedNews) => (
        <Button className="delete-button" onClick={() => handleDelete(action.id)}>
          Delete
        </Button>
      )
    }
  ]

  return (
    <div className="news-wrapper">
      <div className="heading">
        <Typography className="heading-title">News List</Typography>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Create Task
        </Button>
      </div>
      <div className="list-container">
        <Typography className="heading-title">Pinned News</Typography>
        <Table
          bordered
          scroll={{ x: 1200 }}
          dataSource={pinnedNewsList}
          pagination={false}
          columns={pinnedColumn}
          className="list"
        />
      </div>

      <div className="list-container">
        <Typography className="heading-title">Published News</Typography>
        <Table
          bordered
          scroll={{ x: 1200 }}
          dataSource={publishedNewsList}
          pagination={false}
          columns={publishedColumn}
          className="list"
        />
      </div>

      <Modal
        title={`Delete News Id ${newsId}`}
        visible={showModal}
        onOk={() => deleteNews(newsId)}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Delete"
      >
        Are you sure ?
      </Modal>
    </div>
  )
}

const publishedColumn = [
  {
    title: t`ID`,
    dataIndex: 'id',
    key: 'id',
    sorter: (a: any, b: any) => a.id - b.id,
    render: (text: string) => <div key={text}>{text}</div>
  },
  {
    title: t`Action`,
    dataIndex: 'action',
    key: 'action',
    width: '100px',
    render: () => <Button className="delete-button">Delete</Button>
  }
]

export default News
