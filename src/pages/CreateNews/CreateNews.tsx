import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input, Switch, Upload, notification } from 'antd'
import { useAppDispatch } from '../../redux/hook'
import { InboxOutlined } from '@ant-design/icons'
import './CreateNews.less'

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
  const [isDraft, setIsDraft] = useState(false)

  const [form] = Form.useForm()
  const [newsFields, setNewsFields] = useState([
    { name: 'title', value: '' },
    { name: 'description', value: '' },
    { name: 'content', value: '' }
  ])

  useEffect(() => {
    dispatch(setCurrentPage('Create News'))
  }, [dispatch])

  const handleSubmit = (isPin: boolean) => {
    form.validateFields().then((value) => {
      console.log(value)
      const createParam = {
        title: value.title,
        description: value.description,
        content: value.content,
        thumbnail: '',
        pin: !isPin
      }
      console.log('FormSubmit', createParam)
    })
  }

  const handleSaveDraft = () => {
    notification.success({
      message: `Save Draft SuccessFull`,
      placement: 'topRight'
    })
  }

  const handleSetPin = () => {
    setIsPin(!isPin)
  }

  const handleChangeType = () => {
    setIsDraft(!isDraft)
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      form={form}
      fields={newsFields}
      onFinish={() => handleSubmit(isPin)}
    >
      <div className="create-wrapper">
        <div className="left">
          <Form.Item name="title" label="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="description" rules={[{ required: true }]}>
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
            <Select defaultValue="0" style={{ width: 120 }} onChange={handleChangeType}>
              <Option value="0">Public</Option>
              <Option value="1">Draft</Option>
            </Select>
          </div>
          <div className="button-container">
            {isDraft ? (
              <Button type="primary" onClick={handleSaveDraft} className="submit-button">
                Save Draft
              </Button>
            ) : (
              <Button type="primary" htmlType="submit" className="submit-button">
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </Form>
  )
}

export default CreateNews
