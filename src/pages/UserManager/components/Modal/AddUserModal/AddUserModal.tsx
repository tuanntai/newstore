import { Form, Input, Typography, Button, Radio, Space } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ICreateUserRequest, RoleState } from '../../../../../api/user/interface'
import UploadFile from '../../../../../component/UploadFile/UploadFile'
import { createUser } from '../../../../../redux/actions/user/user'
import { useAppDispatch } from '../../../../../redux/hook'
import './sx.less'

// import { Container } from './styles';
export interface IModal {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}
export interface IAddUserModal extends IModal {
  handleOk: () => void
  handleCancel: () => void
}

const AddUserModal: React.FC<IModal> = ({ showModal, setShowModal }) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm<ICreateUserRequest>()
  const redirect = useNavigate()
  const [role, setRole] = useState<RoleState>(RoleState.Shipper)
  const [thumbnailImage, setThumbnailImage] = useState('')
  const [bookFields, setBookFields] = useState([
    { name: 'username', value: '' },
    { name: 'password', value: '' },
    { name: 'fullName', value: '' },
    { name: 'phone', value: '' },
    { name: 'address', value: '' }
  ])

  const handleOk = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        username: value.username,
        password: value.password,
        fullName: value.fullName,
        phone: value.phone,
        address: value.address,
        avatarUrl: thumbnailImage,
        role
      }
      dispatch(createUser(createParam))

      setBookFields([
        { name: 'username', value: '' },
        { name: 'password', value: '' },
        { name: 'fullName', value: '' },
        { name: 'phone', value: '' },
        { name: 'address', value: '' }
      ])
      redirect('')
      setThumbnailImage('')
    })
  }

  const handleCancel = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    if (showModal) {
      setBookFields([
        { name: 'username', value: '' },
        { name: 'password', value: '' },
        { name: 'fullName', value: '' },
        { name: 'phone', value: '' },
        { name: 'address', value: '' }
      ])
    }
  }, [showModal])

  return (
    <Modal
      title="Basic Modal"
      visible={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>
      ]}
    >
      <Form name="basic" labelCol={{ span: 5 }} form={form} fields={bookFields} onFinish={handleOk}>
        <div className="create-user-wrapper">
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
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="right">
            <div className="thumbnail-container">
              <Typography className="title">Thumbnail</Typography>
              <div className="upload-container">
                <UploadFile imgUrl={thumbnailImage} setImgUrl={setThumbnailImage} />
              </div>
            </div>
            <div className="thumbnail-container">
              <Typography className="title">Role</Typography>
              <Radio.Group onChange={(e) => setRole(e.target.value)} value={role}>
                <Space direction="vertical">
                  {[RoleState.User, RoleState.Shipper].map((item) => (
                    <Radio key={item} value={item as RoleState}>
                      {item}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default AddUserModal
