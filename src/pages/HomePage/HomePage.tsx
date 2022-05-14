import { Card, Input, Pagination, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EOrder, EStatus } from '../../api/book/interface'
import { getList } from '../../redux/actions/book/book'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import './HomePage.less'
import './component/ListBookContainer/ListBookContainer.less'
import { formatPrice } from '../../utils/toShort'
import defaultImage from '../../assets/img/defaultBook.png'
const { Option } = Select

const FAKE_LIST = [
  {
    title: 'All',
    value: ''
  },
  {
    title: 'SELLING',
    value: EStatus.SELLING
  },
  {
    title: 'SOLD',
    value: EStatus.SOLD
  }
]

const ORDER_TYPE = [
  {
    title: 'ASC',
    value: EOrder.ASC
  },
  {
    title: 'DESC',
    value: EOrder.DESC
  }
]

const { Meta } = Card
const { Search } = Input
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [status, setStatus] = useState('Selling')
  const [order, setOrder] = useState<EOrder>(EOrder.DESC)
  const onSearch = (value: string) => setSearchKey(value)
  useEffect(() => {
    dispatch(setCurrentPage('Home Page'))
  }, [dispatch])
  const pagePagination = useAppSelector(bookSelectors.pagePaginationBookSelector)
  const listBook = useAppSelector(bookSelectors.bookListSelector)
  const navigate = useNavigate()
  const handleOnClick = (id: number) => {
    navigate(`/book/${id}`)
  }

  function onShowSizeChange(current: any) {
    setPage(current)
  }

  const onShowPageSizeChange = (cur: any, size: any) => {
    setSize(cur)
  }

  const isSellingBook = listBook

  function handleChange(value: any) {
    setStatus(value)
  }

  function handleOrderChange(value: EOrder) {
    setOrder(value)
  }

  const [searchKey, setSearchKey] = useState('')
  useEffect(() => {
    dispatch(getList({ search: searchKey, page: page - 1, size, status, order }))
  }, [dispatch, searchKey, page, size, status, order])
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
          <div>Status: </div>
          <Select defaultValue="Selling" style={{ width: 120 }} onChange={handleChange}>
            {FAKE_LIST.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <div>Order: </div>
          <Select defaultValue={EOrder.DESC} style={{ width: 120 }} onChange={handleOrderChange}>
            {ORDER_TYPE.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="listBookWrapper" style={{ flexWrap: 'wrap' }}>
        {isSellingBook &&
          Array.isArray(isSellingBook) &&
          isSellingBook.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{ width: '300px' }}
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
      <div className="pagination">
        {pagePagination.totalPages > 1 && (
          <Pagination
            onChange={onShowSizeChange}
            onShowSizeChange={onShowPageSizeChange}
            defaultCurrent={page}
            total={pagePagination.totalItems}
          />
        )}
      </div>
    </div>
  )
}

export default HomePage
