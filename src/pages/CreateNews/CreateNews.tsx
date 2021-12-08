import { Modal, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input, Switch, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import './CreateNews.less'
import { ENewsStatus } from '../../api/news/interface'
import { postNews, uploadThumbnail } from '../../redux/actions/news/news'
import { newsSelector, resetNewsProgress } from '../../redux/reducer/news/newsReducer'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { QUILL_MODULES, QUILL_FORMATS } from './constant'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const CreateNews: React.FC = () => {
  const { Option } = Select
  const dispatch = useAppDispatch()
  const [isPin, setIsPin] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [postStatus, setPostStatus] = useState<ENewsStatus>(ENewsStatus.PUBLIC)
  const errorMessage = useAppSelector(newsSelector.newsErrorSelector)
  const progress = useAppSelector(newsSelector.newsProgressSelector)
  const [imgUrl, setImgUrl] = useState('')
  const [form] = Form.useForm()
  const [contentText, setContentText] = useState('')
  const thumbnailImage = useAppSelector(newsSelector.thumbnailSelector)
  const [loadingImage, setLoadingImage] = useState(false)
  const [newsFields, setNewsFields] = useState([
    { name: 'title', value: '' },
    { name: 'excerpt', value: '' },
    { name: 'file', value: null }
  ])

  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  /////////////////////////////////////////////////////////////////////////
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

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notification.error({ message: 'You can only upload JPG/PNG file!' })
    }

    return isJpgOrPng
  }

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        tittle: value.title,
        excerpt: value.excerpt,
        content: contentText,
        imgUrl: imgUrl,
        isPinned: !isPin,
        status: postStatus
      }
      dispatch(postNews(createParam))
      setNewsFields([
        { name: 'title', value: '' },
        { name: 'excerpt', value: '' },
        { name: 'file', value: null }
      ])
      setContentText('')
      setImgUrl('')
    })
  }

  const handleFileChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      let formData = new FormData()
      console.log(info.file.originFileObj)
      formData.append('upload', info.file.originFileObj)
      dispatch(uploadThumbnail(formData))
      setLoadingImage(false)
    }
  }

  /////////////////////////////////////////////////////////////////////////

  const handleContentChange = (value: string) => {
    setContentText(value)
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

  //////////////////////////////////////////////////////////////
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
            <ReactQuill
              value={contentText}
              onChange={handleContentChange}
              placeholder="Write Something..."
              theme="snow"
              formats={QUILL_FORMATS}
              modules={QUILL_MODULES}
            />
          </Form.Item>
        </div>
        <div className="right">
          <div className="thumbnail-container">
            <Typography className="title">Thumbnail</Typography>
          </div>
          <div className="upload-container">
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
            >
              {thumbnailImage ? (
                <img src={thumbnailImage} alt="thumbnail" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className="pin-container">
            <Typography>Pin :</Typography>
            <Switch defaultChecked onChange={handleSetPin} />
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
