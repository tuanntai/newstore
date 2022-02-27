import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import './CreateBook.less'
import UploadFile from '../../component/UploadFile/UploadFile'
import Editor from '../../component/Editor/Editor'
import { postBook } from '../../redux/actions/book/book'
import { userSelectors } from '../../redux/reducer/user/userReducer'
import { useNavigate } from 'react-router-dom'

const { TextArea } = Input
const CreateBook: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const userInfo = useAppSelector(userSelectors.userInfoSelector)
  const redirect = useNavigate()
  const [form] = Form.useForm()
  const [thumbnailImage, setThumbnailImage] = useState('')
  const [bookFields, setBookFields] = useState([
    { name: 'title', value: '' },
    { name: 'author', value: '' },
    { name: 'price', value: 0 }
  ])

  useEffect(() => {
    dispatch(setCurrentPage('Create Book'))
  }, [dispatch])

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      const createParam = {
        title: value.title,
        description: value.description,
        imageUrl: thumbnailImage,
        price: value.price,
        author: value.author,
        ownerId: userInfo.id
      }
      setBookFields([
        { name: 'title', value: '' },
        { name: 'author', value: '' },
        { name: 'price', value: 0 },
        { name: 'description', value: '' }
      ])
      dispatch(postBook(createParam))
      redirect('/book')
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
          <Form.Item name="title" label="title" rules={[{ required: true }]}>
            <Input placeholder="title" />
          </Form.Item>
          <Form.Item name="author" label="author" rules={[{ required: true }]}>
            <Input placeholder="author" />
          </Form.Item>
          <Form.Item name="price" label="price" rules={[{ required: true }]}>
            <Input placeholder="price" />
          </Form.Item>
          <div>
            <Form.Item name="description" label="description">
              <TextArea />
            </Form.Item>
          </div>
        </div>
        <div className="right">
          <div className="thumbnail-container">
            <Typography className="title">Thumbnail</Typography>
          </div>
          <div className="upload-container">
            <UploadFile imgUrl={thumbnailImage} setImgUrl={setThumbnailImage} />
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

export default CreateBook
