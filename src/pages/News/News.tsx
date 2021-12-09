import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography, Modal, notification } from 'antd'
import {
  deleteNewsById,
  getDraft,
  getNewsById,
  getPinnedNews,
  getPublished
} from '../../redux/actions/news/news'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { newsSelector, resetNewsProgress, setNewsId } from '../../redux/reducer/news/newsReducer'
import { INews, IPinnedNews } from '../../api/news/interface'
import ListTable from '../../component/ListTable/ListTable'
import './News.less'
import { format } from 'date-fns'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const News: React.FC = () => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const pinnedNewsList = useAppSelector(newsSelector.pinnedNewsSelector)
  const publishedNewsList = useAppSelector(newsSelector.publishedSelector)
  const newsId = useAppSelector(newsSelector.newsIdSelector)
  const errorMessage = useAppSelector(newsSelector.newsErrorSelector)
  const progress = useAppSelector(newsSelector.newsProgressSelector)
  const draftNewsList = useAppSelector(newsSelector.draftNewsSelector)

  useEffect(() => {
    dispatch(setCurrentPage('News'))
    dispatch(getDraft())
    dispatch(getPublished())
    dispatch(getPinnedNews())
    dispatch(resetNewsProgress())
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
    dispatch(resetNewsProgress())
  }, [progress, errorMessage, dispatch])

  const handleDelete = (id: number) => {
    dispatch(setNewsId(id))
    setShowModal(!showModal)
  }

  const handleEdit = (id: number) => {
    dispatch(setNewsId(id))
    dispatch(getNewsById(id))
    navigate(`edit-news/${id}`)
  }

  const deleteNews = (id: number) => {
    dispatch(deleteNewsById(id))
    setShowModal(!showModal)
  }

  const handleCancel = () => {
    setShowModal(false)
    setShowEditModal(false)
  }

  const handleCreate = () => {}

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
      render: (text: string, action: IPinnedNews) => (
        <div className="thumbnail-box">
          <img alt={`img${action.id}`} src={text} />
        </div>
      )
    },
    {
      title: t`Action`,
      dataIndex: 'action',
      key: 'action',
      width: '120px',
      render: (record: any, action: IPinnedNews) => (
        <div className="button-box">
          <Button className="edit-button" type="primary" onClick={() => handleEdit(action.id)}>
            Edit
          </Button>
          <Button className="delete-button" onClick={() => handleDelete(action.id)}>
            Delete
          </Button>
        </div>
      )
    }
  ]

  const newsColumn = [
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
      title: t`Time Created`,
      dataIndex: 'timeCreated',
      key: 'timeCreated',
      render: (text: string) => <div>{format(new Date(text), 'dd/MM/yy')}</div>
    },
    {
      title: t`Time Modified`,
      dataIndex: 'timeModified',
      key: 'timeModified',
      render: (text: string) => <div>{format(new Date(text), 'dd/MM/yy')}</div>
    },
    {
      title: t`Thumbnail`,
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (text: string, action: INews) => (
        <div className="thumbnail-box">
          <img alt={`img${action.id}`} src={text} />
        </div>
      )
    },
    {
      title: t`Action`,
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      render: (record: any, action: INews) => (
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
        <Link to="create-news">
          <Button type="primary" icon={<PlusOutlined />}>
            Create Task
          </Button>
        </Link>
      </div>
      <ListTable
        title="Pinned News"
        dataSource={pinnedNewsList}
        pagination={false}
        columns={pinnedColumn}
        scroll={{ x: 1200 }}
      />
      <ListTable
        title="Published News"
        dataSource={publishedNewsList}
        pagination={false}
        columns={newsColumn}
        scroll={{ x: 1200 }}
      />
      <ListTable
        title="Draft News"
        dataSource={draftNewsList}
        pagination={false}
        columns={newsColumn}
        scroll={{ x: 1200 }}
      />
      {/* Delete Modal */}
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

      {/* Edit Modal */}
      <Modal
        title={`Edit News Id ${newsId}`}
        visible={showEditModal}
        onOk={() => deleteNews(newsId)}
        onCancel={handleCancel}
        cancelText="Cancel"
        okText="Submit"
      >
        Are you sure ?
      </Modal>
    </div>
  )
}

export default News
