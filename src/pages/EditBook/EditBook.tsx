// import { Modal } from 'antd'
// import React, { useEffect, useState } from 'react'
// import { setCurrentPage } from '../../redux/reducer/navigateReducer'
// import { Button, Typography, Form, Input } from 'antd'
// import { useAppDispatch, useAppSelector } from '../../redux/hook'
// import '../CreateBook/CreateBook.less'
// import 'react-quill/dist/quill.snow.css'
// import UploadFile from '../../component/UploadFile/UploadFile'
// import { useParams } from 'react-router-dom'
// import Editor from '../../component/Editor/Editor'
// import { getBookById } from '../../redux/actions/book/book'
// import { bookSelectors } from '../../redux/reducer/book/bookReducer'

// const EditBook: React.FC = () => {
//   const { id } = useParams()
//   const [form] = Form.useForm()
//   const dispatch = useAppDispatch()
//   const [imgUrl, setImgUrl] = useState('')
//   const [showModal, setShowModal] = useState(false)
//   const [contentText, setContentText] = useState('')
//   const bookInfo = useAppSelector(bookSelectors.bookInfoSelector)

//   const [bookFields, setBookFields] = useState([
//     { name: 'title', value: '' },
//     { name: 'excerpt', value: '' },
//     { name: 'author', value: '' },
//     { name: 'publisher', value: '' },
//     { name: 'price', value: 0 },
//     { name: 'amount', value: 0 },
//     { name: 'discountPercent', value: 0 }
//   ])

//   useEffect(() => {
//     dispatch(setCurrentPage('Edit Book'))
//     dispatch(getBookById(Number(id)))
//   }, [dispatch, id])

//   useEffect(() => {
//     if (bookInfo) {
//       setContentText(bookInfo.description)
//       setImgUrl(bookInfo.imageUrl)
//       setBookFields([
//         { name: 'title', value: bookInfo.title },
//         { name: 'excerpt', value: bookInfo.excerpt },
//         { name: 'author', value: bookInfo.author },
//         { name: 'publisher', value: bookInfo.publisher },
//         { name: 'price', value: bookInfo.price },
//         { name: 'amount', value: bookInfo.amount },
//         { name: 'discountPercent', value: bookInfo.discountPercent }
//       ])
//     }
//   }, [bookInfo])

//   const handleSubmit = () => {
//     setShowModal(!showModal)
//     form.validateFields().then((value) => {
//       // const createParam = {}
//       // dispatch(
//       //   editBook({
//       //     id: bookId,
//       //     editedData: createParam
//       //   })
//       // )
//       setBookFields([
//         { name: 'title', value: '' },
//         { name: 'excerpt', value: '' }
//       ])
//       setContentText('')
//       setImgUrl('')
//     })
//   }

//   const handleCancel = () => {
//     setShowModal(!showModal)
//   }

//   return (
//     <Form
//       name="basic"
//       labelCol={{ span: 2 }}
//       form={form}
//       fields={bookFields}
//       onFinish={handleSubmit}
//     >
//       <div className="create-wrapper">
//         <div className="left">
//           <Form.Item name="title" label="title" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="excerpt" label="excerpt" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="content">
//             <Editor contentText={contentText} setContentText={setContentText} />
//           </Form.Item>
//         </div>
//         <div className="right">
//           <div className="thumbnail-container">
//             <Typography className="title">Thumbnail</Typography>
//           </div>
//           <div className="upload-container">
//             <UploadFile imgUrl={imgUrl} setImgUrl={setImgUrl} />
//           </div>

//           <div className="button-container">
//             <Button
//               type="primary"
//               className="submit-button"
//               onClick={() => setShowModal(!showModal)}
//             >
//               Submit
//             </Button>
//           </div>
//           <Modal
//             title="Edit Book"
//             visible={showModal}
//             onOk={handleSubmit}
//             onCancel={handleCancel}
//             cancelText="Cancel"
//             okText="Submit"
//           >
//             Are you sure ?
//           </Modal>
//         </div>
//       </div>
//     </Form>
//   )
// }

// export default EditBook
import React from 'react';

// import { Container } from './styles';

const EditBook: React.FC = () => {
  return <div />;
}

export default EditBook;