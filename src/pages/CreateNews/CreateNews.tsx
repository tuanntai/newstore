import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input, Switch, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import './CreateNews.less'
import { ENewsStatus } from '../../api/news/interface'
import { postNews } from '../../redux/actions/news/news'
import { newsSelector, resetNewsProgress } from '../../redux/reducer/news/newsReducer'
import UploadFile from '../../component/UploadFile/UploadFile'
import Editor from '../../component/Editor/Editor'

const CreateNews: React.FC = () => {
  const { Option } = Select
  const dispatch = useAppDispatch()
  const [isPin, setIsPin] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [postStatus, setPostStatus] = useState<ENewsStatus>(ENewsStatus.PUBLIC)
  const errorMessage = useAppSelector(newsSelector.newsErrorSelector)
  const progress = useAppSelector(newsSelector.newsProgressSelector)
  const [form] = Form.useForm()
  const [contentText, setContentText] = useState('')
  const [thumbnailImage, setThumbnailImage] = useState('')
  const [newsFields, setNewsFields] = useState([
    { name: 'title', value: '' },
    { name: 'excerpt', value: '' }
  ])

  useEffect(() => {
    dispatch(setCurrentPage('Create News'))
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

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        tittle: value.title,
        excerpt: value.excerpt,
        content: contentText,
        imgUrl: thumbnailImage,
        isPinned: postStatus === ENewsStatus.DRAFT ? false : isPin,
        status: postStatus
      }
      dispatch(postNews(createParam))
      setNewsFields([
        { name: 'title', value: '' },
        { name: 'excerpt', value: '' }
      ])
      setContentText('')
      setThumbnailImage('')
    })
  }

  const handleSetPin = () => {
    setIsPin(!isPin)
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
            <UploadFile imgUrl={thumbnailImage} setImgUrl={setThumbnailImage} />
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
              {postStatus === ENewsStatus.DRAFT ? 'Save Draft' : 'Submit'}
            </Button>
          </div>
          <Modal
            title={postStatus === ENewsStatus.DRAFT ? 'Save Draft' : 'Publish News'}
            visible={showModal}
            onOk={handleSubmit}
            onCancel={handleCancel}
            cancelText="Cancel"
            okText={postStatus === ENewsStatus.DRAFT ? 'Save' : 'Submit'}
          >
            Are you sure ?
          </Modal>
        </div>
      </div>
    </Form>
  )
}

export default CreateNews
