import { Modal, Select, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import '../CreateNews/CreateNews.less'
import { ENewsStatus } from '../../api/news/interface'
import { editNews, getNewsById, uploadThumbnail } from '../../redux/actions/news/news'
import { newsSelector, resetNewsProgress } from '../../redux/reducer/news/newsReducer'
import 'react-quill/dist/quill.snow.css'
import UploadFile from '../../component/UploadFile/UploadFile'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../../component/Editor/Editor'

const EditNews: React.FC = () => {
  const [isPin, setIsPin] = useState(false)
  const { id } = useParams()
  const { Option } = Select
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [imgUrl, setImgUrl] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [contentText, setContentText] = useState('')
  const newsId = useAppSelector(newsSelector.newsIdSelector)
  const progress = useAppSelector(newsSelector.newsProgressSelector)
  const errorMessage = useAppSelector(newsSelector.newsErrorSelector)
  const [postStatus, setPostStatus] = useState<ENewsStatus>(ENewsStatus.PUBLIC)
  const newsInfo = useAppSelector(newsSelector.newsInfoSelector)

  const [newsFields, setNewsFields] = useState([
    { name: 'title', value: '' },
    { name: 'excerpt', value: '' }
  ])

  useEffect(() => {
    dispatch(setCurrentPage('Edit News'))
    dispatch(resetNewsProgress())
    dispatch(getNewsById(Number(id)))
  }, [id])

  const handleSetPin = () => {
    setIsPin(!isPin)
  }

  useEffect(() => {
    if (newsInfo) {
      setContentText(newsInfo.content)
      setImgUrl(newsInfo.imgUrl)
      setNewsFields([
        { name: 'title', value: newsInfo.title },
        { name: 'excerpt', value: newsInfo.excerpt }
      ])
    }
  }, [newsInfo])
  useEffect(() => {
    if (progress === false && errorMessage) {
      notification.error({
        message: errorMessage,
        placement: 'topRight'
      })
    } else if (progress) {
      navigate(-1)
    }
  }, [progress, errorMessage, dispatch])

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        title: value.title,
        excerpt: value.excerpt,
        content: contentText,
        imgUrl: imgUrl,
        status: postStatus,
        isPinned: postStatus === ENewsStatus.DRAFT ? false : isPin
      }
      dispatch(
        editNews({
          id: newsId,
          editedData: createParam
        })
      )
      setNewsFields([
        { name: 'title', value: '' },
        { name: 'excerpt', value: '' }
      ])
      setContentText('')
      setImgUrl('')
    })
  }

  const handleCancel = () => {
    setShowModal(!showModal)
  }

  const handleChangeType = (value: ENewsStatus) => {
    setPostStatus(value)
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 2 }}
      form={form}
      fields={newsFields}
      onFinish={handleSubmit}
    >
      <div className="create-wrapper">
        <div className="left">
          <Form.Item name="title" label="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="excerpt" label="excerpt" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="content">
            <Editor contentText={contentText} setContentText={setContentText} />
          </Form.Item>
        </div>
        <div className="right">
          <div className="thumbnail-container">
            <Typography className="title">Thumbnail</Typography>
          </div>
          <div className="upload-container">
            <UploadFile imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </div>
          <div className="select-container">
            <Typography>Select Type:</Typography>
            <Select
              defaultValue={ENewsStatus.PUBLIC}
              style={{ width: 120 }}
              onChange={handleChangeType}
            >
              <Option value={ENewsStatus.PUBLIC}>Public</Option>
              <Option value={ENewsStatus.DRAFT}>Draft</Option>
            </Select>
          </div>
          {postStatus === ENewsStatus.PUBLIC && (
            <div className="pin-container">
              <Typography>Pin :</Typography>
              <Switch onChange={handleSetPin} />
            </div>
          )}
          <div className="button-container">
            <Button
              type="primary"
              className="submit-button"
              onClick={() => setShowModal(!showModal)}
            >
              Submit
            </Button>
          </div>
          <Modal
            title="Edit News"
            visible={showModal}
            onOk={handleSubmit}
            onCancel={handleCancel}
            cancelText="Cancel"
            okText="Submit"
          >
            Are you sure ?
          </Modal>
        </div>
      </div>
    </Form>
  )
}

export default EditNews
