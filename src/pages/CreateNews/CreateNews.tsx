import { Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input, Switch, Upload, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { InboxOutlined } from '@ant-design/icons'
import './CreateNews.less'
import { ENewsStatus } from '../../api/news/interface'
import { postNews } from '../../redux/actions/news/news'
import { newsSelector } from '../../redux/reducer/news/newsReducer'

const CreateNews: React.FC = () => {
  const { TextArea } = Input
  const { Option } = Select
  const { Dragger } = Upload

  const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        notification.success({
          message: `${info.file.name} file uploaded successfully.`,
          placement: 'topRight'
        })
      } else if (status === 'error') {
        notification.error({
          message: `${info.file.name} file upload failed.`,
          placement: 'topRight'
        })
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  const dispatch = useAppDispatch()
  const [isPin, setIsPin] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [postStatus, setPostStatus] = useState<ENewsStatus>(ENewsStatus.PUBLIC)
  const errorMessage = useAppSelector(newsSelector.newsErrorSelector)
  const progress = useAppSelector(newsSelector.newsProgressSelector)

  const [form] = Form.useForm()
  const [newsFields, setNewsFields] = useState([
    { name: 'title', value: '' },
    { name: 'excerpt', value: '' },
    { name: 'content', value: '' }
  ])

  useEffect(() => {
    dispatch(setCurrentPage('Create News'))
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

  const handleSubmit = () => {
    setShowModal(!showModal)

    form.validateFields().then((value) => {
      const createParam = {
        tittle: value.title,
        excerpt: value.excerpt,
        content: value.content,
        imgUrl: '',
        isPinned: !isPin,
        status: postStatus
      }
      dispatch(postNews(createParam))
      setNewsFields([
        { name: 'title', value: '' },
        { name: 'excerpt', value: '' },
        { name: 'content', value: '' }
      ])
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
      labelCol={{ span: 4 }}
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
          <Form.Item name="content" label="content" rules={[{ required: true }]}>
            <TextArea rows={10} />
          </Form.Item>
        </div>
        <div className="right">
          <div className="thumbnail-container">
            <Typography className="title">Thumbnail</Typography>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data
                or other band files
              </p>
            </Dragger>
          </div>
          <div className="pin-container">
            <Typography>Pin</Typography>
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
            okText="Delete"
          >
            Are you sure ?
          </Modal>
        </div>
      </div>
    </Form>
  )
}

export default CreateNews
