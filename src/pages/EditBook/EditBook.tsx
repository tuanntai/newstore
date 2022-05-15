import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { Button, Typography, Form, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import UploadFile from '../../component/UploadFile/UploadFile'
import { getBookById, updateBook } from '../../redux/actions/book/book'
import { useNavigate, useParams } from 'react-router-dom'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { IUpdateBookRequest } from '../../api/book/interface'

const { TextArea } = Input
const Edit: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  // const userInfo = useAppSelector(userSelectors.userInfoSelector)
  const redirect = useNavigate()
  const [form] = Form.useForm()
  const [thumbnailImage, setThumbnailImage] = useState('')
  const book = useAppSelector(bookSelectors.bookInfoSelector)

  const [bookFields, setBookFields] = useState([
    { name: 'title', value: book?.title },
    { name: 'author', value: book?.author },
    { name: 'price', value: Number(book?.price) },
    { name: 'description', value: book?.description }
  ])

  useEffect(() => {
    if (book) setThumbnailImage(book.imageUrl)
  }, [book])

  useEffect(() => {
    dispatch(setCurrentPage('Edit Book'))
    if (id) dispatch(getBookById(id))
  }, [dispatch, id])

  const handleSubmit = () => {
    setShowModal(!showModal)
    form.validateFields().then((value) => {
      if (book) {
        const updateParam: IUpdateBookRequest = {
          ...book,
          title: value.title,
          description: value.description,
          imageUrl: thumbnailImage,
          price: value.price,
          author: value.author,
          ownerId: book.owner
        }
        setBookFields([
          { name: 'title', value: '' },
          { name: 'author', value: '' },
          { name: 'price', value: 0 },
          { name: 'description', value: '' }
        ])
        dispatch(updateBook({ id: book.id, payload: updateParam }))
        redirect('/book-manager')
        setThumbnailImage('')
      }
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
          <Form.Item
            name="price"
            label="price"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_) {
                  if (getFieldValue('price') > 0) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('Price Should be Bigger than 0 '))
                  }
                }
              })
            ]}
          >
            <Input placeholder="price" />
          </Form.Item>
          <div>
            <Form.Item name="description" label="description">
              <TextArea rows={6} />
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
              Update
            </Button>
          </div>
          <Modal
            title={'Edit Book'}
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

export default Edit
