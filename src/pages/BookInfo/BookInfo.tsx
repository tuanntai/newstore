import { CheckCircleTwoTone, DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Modal, notification } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { USER_API_URL } from '../../api/apiUrls'
import { EBookStatus } from '../../api/book/interface'
import { IUserById, IUserInfo } from '../../api/user/interface'
import { buyBook, getBookById } from '../../redux/actions/book/book'
import { createDelivery } from '../../redux/actions/delivery/delivery'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { getApi } from '../../utils/apiHelper'
import { getUserIdLocal } from '../../utils/localStorageService'
import './BookInfo.less'

export enum Status {
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed'
}

const BookInfo: React.FC = () => {
  const { id } = useParams()
  const bookInfo = useAppSelector(bookSelectors.bookInfoSelector)
  const dispatch = useAppDispatch()
  const [isLike, setIsLike] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [status, setStatus] = useState<Status>(Status.Pending)
  const [owner, setOwner] = useState<IUserInfo>()
  const userId = getUserIdLocal()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setCurrentPage('Book Info'))
  }, [dispatch])

  const ownerInfoAction = useCallback(async () => {
    if (bookInfo) {
      const response = await getApi<IUserById>(USER_API_URL.getUserById(bookInfo.ownerId))
      setOwner(response.data)
    }
  }, [bookInfo])

  useEffect(() => {
    ownerInfoAction()
  }, [ownerInfoAction])

  useEffect(() => {
    dispatch(getBookById(id as string))
  }, [id, dispatch])

  useEffect(() => {
    if (status === Status.Success && bookInfo && userId) {
      dispatch(createDelivery({ bookId: bookInfo.id, buyerId: userId }))
      setStatus(Status.Pending)
    }
  }, [status, bookInfo, dispatch, userId])

  // useEffect(() => {
  //   if (bookInfo && bookInfo.receiptInfo) {
  //     navigate(`/receipt/${bookInfo.receiptInfo?.id}`)
  //   }
  // }, [bookInfo, navigate])

  const handleOk = () => {
    setIsModalVisible(false)
    if (id && userId) {
      dispatch(buyBook({ payload: { id, buyerId: userId }, setStatus }))
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleLike = () => {
    setIsLike(!isLike)
    isLike
      ? notification.success({ message: 'Like Successful!', placement: 'bottomRight' })
      : notification.success({ message: 'Dislike this book', placement: 'bottomRight' })
  }
  return (
    <div className="book-detail-wrapper">
      <div className="book-info">
        <div className="book-image">
          <img src={bookInfo?.imageUrl} alt="bookImage" />
        </div>
        <div className="right-book-info">
          <h1>{bookInfo?.title}</h1>
          <div className="owner">
            <div>
              <div>Author: {bookInfo?.author}</div>
              <div>Price: {bookInfo?.price} $ </div>
              <div>Address: {owner?.address} </div>
            </div>
            <div>
              <div>
                Owner: {owner?.fullName} {'   '}
                {owner?.isVerify && <CheckCircleTwoTone />}
              </div>
              Status:{' '}
              {bookInfo && bookInfo?.status === EBookStatus.SELLING ? (
                <span>{bookInfo?.status}</span>
              ) : (
                <span className="sold">{bookInfo?.status}</span>
              )}
            </div>
          </div>
          <div className="description"> {bookInfo?.description} </div>
          <div className="buy-wrapper">
            <button onClick={() => handleLike()}>
              {isLike ? (
                <>
                  <DislikeOutlined /> DISLIKE
                </>
              ) : (
                <>
                  <LikeOutlined />
                  LIKE
                </>
              )}
            </button>
            {bookInfo?.status === EBookStatus.SELLING ? (
              <button onClick={() => setIsModalVisible(!isModalVisible)}>Buy this Book</button>
            ) : (
              <button disabled>NOT AVAILABLE</button>
            )}
          </div>
        </div>
      </div>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        Confirm Buy This Book!
      </Modal>
    </div>
  )
}

export default BookInfo
