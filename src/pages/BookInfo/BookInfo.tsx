import { CheckCircleTwoTone, DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { USER_API_URL } from '../../api/apiUrls'
import { EStatus } from '../../api/book/interface'
import { IUserInfo } from '../../api/user/interface'
import { buyBook, getBookById } from '../../redux/actions/book/book'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { getApi } from '../../utils/apiHelper'
import { getUserIdLocal } from '../../utils/localStorageService'
import { formatPrice } from '../../utils/toShort'
import './BookInfo.less'

const BookInfo: React.FC = () => {
  const { id } = useParams()
  const bookInfo = useAppSelector(bookSelectors.bookInfoSelector)
  const dispatch = useAppDispatch()
  const [isLike, setIsLike] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [owner, setOwner] = useState<IUserInfo>()
  const userId = getUserIdLocal()
  useEffect(() => {
    dispatch(getBookById(Number(id)))
    ownerInfoAction()
  }, [id, dispatch])

  const handleOk = () => {
    setIsModalVisible(false)
    dispatch(buyBook({ id: Number(id), buyerId: Number(userId) }))
  }

  const ownerInfoAction = async () => {
    const response = await getApi<IUserInfo>(USER_API_URL.getUserById(Number(bookInfo?.ownerId)))
    setOwner(response)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleLike = () => {
    setIsLike(!isLike)
    isLike
      ? notification.success({ message: 'Like Successful!' })
      : notification.success({ message: 'Dislike this book' })
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
              <div>Price: {formatPrice(Number(bookInfo?.price))} </div>
              <div>Address: {owner?.address} VND</div>
            </div>
            <div>
              <div>
                Owner: {owner?.fullName} {'   '}
                {owner?.isVerify && <CheckCircleTwoTone />}
              </div>
              Status:{' '}
              {bookInfo?.status === EStatus.SELLING ? (
                <span>{bookInfo?.status.toUpperCase()}</span>
              ) : (
                <span className="sold">{bookInfo?.status.toUpperCase()}</span>
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
            {bookInfo?.status === EStatus.SELLING ? (
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
