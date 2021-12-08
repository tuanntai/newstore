import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import '../CreateNews/CreateNews.less'
import { ENewsStatus } from '../../api/news/interface'
import { editNews, uploadThumbnail } from '../../redux/actions/news/news'
import { newsSelector, resetNewsProgress } from '../../redux/reducer/news/newsReducer'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { QUILL_MODULES, QUILL_FORMATS } from '../CreateNews/constant'

const EditNews: React.FC = () => {
  const { Option } = Select
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [postStatus, setPostStatus] = useState<ENewsStatus>(ENewsStatus.PUBLIC)
  const newsId = useAppSelector(newsSelector.newsIdSelector)
  const errorMessage = useAppSelector(newsSelector.newsErrorSelector)
  const progress = useAppSelector(newsSelector.newsProgressSelector)
  const [imgUrl, setImgUrl] = useState('')
  const [form] = Form.useForm()
  const [contentText, setContentText] = useState('')
  const newsInfo = useAppSelector(newsSelector.newsInfoSelector)
  const [newsFields, setNewsFields] = useState([
    { name: 'title', value: newsInfo.tittle },
    { name: 'excerpt', value: newsInfo.excerpt }
  ])

  /////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    dispatch(setCurrentPage('Edit News'))
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
        imgUrl: imgUrl,
        status: postStatus
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

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      let formData = new FormData()
      console.log(e.target.files[0])
      formData.append('upload', e.target.files[0])
      dispatch(uploadThumbnail(formData))
    }
  }

  /////////////////////////////////////////////////////////////////////////

  const handleContentChange = (value: string) => {
    setContentText(value)
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
              defaultValue={newsInfo.content}
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
            <input
              id="image"
              accept="image/png/jpg"
              type="file"
              name="file"
              onChange={(event: any) => handleFileChange(event)}
              defaultValue={newsInfo.imgUrl}
            />
          </div>
          {/* <div className="pin-container">
            <Typography>Pin :</Typography>
            <Switch onChange={handleSetPin} defaultChecked />
          </div> */}
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
