import { Button, Card, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import UploadFile from '../../component/UploadFile/UploadFile'
import { getBookByUserId, updateUser } from '../../redux/actions/user/user'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { userSelectors } from '../../redux/reducer/user/userReducer'
import { getUserIdLocal } from '../../utils/localStorageService'
import { formatPrice } from '../../utils/toShort'
import './User.less'

import defaultImage from '../../assets/img/defaultBook.png'
import { useNavigate } from 'react-router-dom'
import Meta from 'antd/lib/card/Meta'
import { EStatus } from '../../api/book/interface'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'

const User: React.FC = () => {
  const dispatch = useAppDispatch()
  const userId = getUserIdLocal()
  const listBook = useAppSelector(userSelectors.userListBookSelector)
  const listAllBook = useAppSelector(bookSelectors.bookListSelector)
  const userInfo = useAppSelector(userSelectors.userInfoSelector)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [thumbnailImage, setThumbnailImage] = useState('')
  const boughtBook = listBook.filter((item) => item.buyerId === Number(userId))
  const [form] = Form.useForm()
  const [bookFields, setBookFields] = useState([
    { name: 'username', value: '' },
    { name: 'password', value: '' },
    { name: 'fullName', value: '' },
    { name: 'email', value: '' },
    { name: 'phone', value: '' },
    { name: 'address', value: '' }
  ])

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setCurrentPage('User'))
  }, [dispatch])

  useEffect(() => {
    dispatch(getBookByUserId(Number(userId)))
  }, [dispatch, userId])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
    handleSubmit()
  }

  const handleSubmit = () => {
    setIsModalVisible(!isModalVisible)
    form.validateFields().then((value) => {
      const updateParam = {
        username: value.username,
        password: value.password,
        fullName: value.fullName,
        email: value.email,
        phone: value.phone,
        address: value.address,
        avatarUrl: thumbnailImage,
        id: Number(userId)
      }
      dispatch(updateUser(updateParam))
      setThumbnailImage('')
    })
  }

  useEffect(() => {
    if (userInfo) {
      setBookFields([
        { name: 'fullName', value: userInfo.fullName },
        { name: 'email', value: userInfo.email },
        { name: 'phone', value: userInfo.phone },
        { name: 'address', value: userInfo.address }
      ])
      if (userInfo.avatarUrl) {
        setThumbnailImage(userInfo.avatarUrl)
      }
    }
  }, [userInfo])

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleOnClick = (id: number) => {
    navigate(`/book/${id}`)
  }
  return (
    <div className="userWrapper">
      <Button type="primary" onClick={showModal}>
        Update Info
      </Button>
      <h1>YOUR BOOK</h1>
      <div className="listBookWrapper">
        {listBook.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{ width: 300 }}
            onClick={() => handleOnClick(item.id)}
            cover={<img alt="example" src={item.imageUrl ? item.imageUrl : defaultImage} />}
          >
            <div className="item-info">
              <Meta title={item.title} description={`Price: ${formatPrice(item.price)} VND`} />
              <div>
                Status:{' '}
                {item.status === EStatus.SELLING ? (
                  <span className="available"> {item.status}</span>
                ) : (
                  <span className="sold"> {item.status}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <h1>YOUR PURCHASED BOOK</h1>
      <div className="listBookWrapper">
        {listAllBook.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{ width: 300 }}
            onClick={() => handleOnClick(item.id)}
            cover={<img alt="example" src={item.imageUrl ? item.imageUrl : defaultImage} />}
          >
            <div className="item-info">
              <Meta title={item.title} description={`Price: ${formatPrice(item.price)} VND`} />
              <div>
                Status:{' '}
                {item.status === EStatus.SELLING ? (
                  <span className="available"> {item.status}</span>
                ) : (
                  <span className="sold"> {item.status}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Modal
        title="Info Update Form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          form={form}
          fields={bookFields}
          onFinish={handleSubmit}
        >
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <UploadFile imgUrl={thumbnailImage} setImgUrl={setThumbnailImage} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User
