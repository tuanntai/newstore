import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input } from 'antd'
import { useAppDispatch } from '../../redux/hook'
import '../CreateBook/CreateBook.less'
import UploadFile from '../../component/UploadFile/UploadFile'
import Editor from '../../component/Editor/Editor'
import { postBook } from '../../redux/actions/book/book'
import { createUser } from '../../redux/actions/user/user'
import { authLogin } from '../../redux/actions/auth/auth'
import { useNavigate } from 'react-router-dom'

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [form] = Form.useForm()
  const [contentText, setContentText] = useState('')
  const redirect = useNavigate()
  const [thumbnailImage, setThumbnailImage] = useState('')
  const [bookFields, setBookFields] = useState([
    { name: 'username', value: '' },
    { name: 'password', value: '' },
    { name: 'fullName', value: '' },
    { name: 'email', value: '' },
    { name: 'phone', value: '' },
    { name: 'address', value: '' }
  ])

  useEffect(() => {
    dispatch(setCurrentPage('Create Book'))
  }, [dispatch])

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        username: value.username,
        password: value.password,
        fullName: value.fullName,
        email: value.email,
        phone: value.phone,
        address: value.address,
        avatarUrl: thumbnailImage
      }
      dispatch(createUser(createParam)).then(() => {
        dispatch(
          authLogin({
            username: value.username,
            password: value.password
          })
        )
      })

      setBookFields([
        { name: 'username', value: '' },
        { name: 'password', value: '' },
        { name: 'fullName', value: '' },
        { name: 'email', value: '' },
        { name: 'phone', value: '' },
        { name: 'address', value: '' }
      ])
      setContentText('')
      redirect('')
      setThumbnailImage('')
    })
  }

  const handleCancel = () => {
    setShowModal(!showModal)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 2 }}
      form={form}
      fields={bookFields}
      onFinish={handleSubmit}
    >
      <div className="create-wrapper">
        <div className="left">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </div>
        <div className="right">
          <div className="thumbnail-container">
            <Typography className="title">Thumbnail</Typography>
          </div>
          <div className="upload-container">
            <UploadFile imgUrl={thumbnailImage} setImgUrl={setThumbnailImage} />
          </div>

          <div className="select-container"></div>

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
            title={'Publish Book'}
            visible={showModal}
            onOk={handleSubmit}
            onCancel={handleCancel}
            cancelText="Cancel"
            okText={'Submit'}
          >
            Are you sure ?
          </Modal>
        </div>
      </div>
    </Form>
  )
}

export default SignUp
