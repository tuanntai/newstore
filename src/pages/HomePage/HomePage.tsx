import { Card, Input, Pagination, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EOrder, EBookStatus } from '../../api/book/interface'
import { getSellingBooks } from '../../redux/actions/book/book'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import './HomePage.less'
import './component/ListBookContainer/ListBookContainer.less'
import { formatPrice } from '../../utils/toShort'
import defaultImage from '../../assets/img/defaultBook.png'

export const FAKE_LIST = [
  {
    title: 'All',
    value: ''
  },
  {
    title: 'SELLING',
    value: EBookStatus.SELLING
  },
  {
    title: 'SOLD',
    value: EBookStatus.SOLD
  }
]

export const ORDER_TYPE = [
  {
    title: 'ASC',
    value: EOrder.ASC
  },
  {
    title: 'DESC',
    value: EOrder.DESC
  }
]
const { Option } = Select
const { Meta } = Card
const { Search } = Input
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [order, setOrder] = useState<EOrder>(EOrder.DESC)
  const onSearch = (value: string) => setSearchKey(value)

  const listBook = useAppSelector(bookSelectors.sellingBooksSelector)
  const navigate = useNavigate()
  const handleOnClick = (id: string) => {
    navigate(`/book/${id}`)
  }

  function onShowSizeChange(current: any) {
    setPage(current)
  }

  const onShowPageSizeChange = (cur: any, size: any) => {
    setSize(cur)
  }

  function handleOrderChange(value: EOrder) {
    setOrder(value)
  }

  const [searchKey, setSearchKey] = useState('')
  useEffect(() => {
    dispatch(
      getSellingBooks({
        search: searchKey,
        page: page - 1,
        size,
        status: EBookStatus.SELLING,
        order
      })
    )
  }, [dispatch, searchKey, page, size, order])

  useEffect(() => {
    dispatch(setCurrentPage('Home Page'))
  }, [dispatch])

  return (
    <div className="homepageWrapper">
      <Search
        placeholder="Enter What You Need ?"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <div className="filter-box">
        <div>
          <div>Order: </div>
          <Select defaultValue={order} style={{ width: 120 }} onChange={handleOrderChange}>
            {ORDER_TYPE.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="listBookWrapper" style={{ flexWrap: 'wrap' }}>
        {listBook &&
          listBook.data.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{ width: '300px', boxShadow: `rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
              rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset` }}
              onClick={() => handleOnClick(item.id)}
              cover={<img alt="example" src={item.imageUrl ? item.imageUrl : defaultImage} />}
            >
              <div className="item-info">
                <Meta title={item.title} description={`Price: $${formatPrice(item.price)}`} />
                <div>
                  Status:{' '}
                  {item.status === EBookStatus.SELLING ? (
                    <span className="available"> {item.status}</span>
                  ) : (
                    <span className="sold"> {item.status}</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
      </div>
      <div className="pagination">
        {listBook.totalPages > 1 && (
          <Pagination
            onChange={onShowSizeChange}
            onShowSizeChange={onShowPageSizeChange}
            defaultCurrent={page}
            total={listBook.totalItems}
          />
        )}
      </div>
    </div>
  )
}

export default HomePage
