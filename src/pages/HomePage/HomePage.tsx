import { Card, Input, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EStatus } from '../../api/book/interface'
import { getList } from '../../redux/actions/book/book'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { bookSelectors } from '../../redux/reducer/book/bookReducer'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import './HomePage.less'
import './component/ListBookContainer/ListBookContainer.less'
import { formatPrice } from '../../utils/toShort'
import defaultImage from '../../assets/img/defaultBook.png'

const FAKE_LIST = [
  {
    id: 0,
    title: 'Hello',
    status: EStatus.SELLING,
    price: 0,
    imageUrl: defaultImage
  }
]

const { Meta } = Card
const { Search } = Input
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
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
    console.log(current)
    setPage(current)
  }

  const isSellingBook = listBook

  const [searchKey, setSearchKey] = useState('')
  useEffect(() => {
    dispatch(getList({ search: searchKey, page: page - 1, size }))
  }, [dispatch, searchKey, page, size])
  return (
    <div className="homepageWrapper">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      <div className="listBookWrapper" style={{ flexWrap: 'wrap' }}>
        {isSellingBook.map((item) => (
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
        <Pagination
          onChange={onShowSizeChange}
          defaultCurrent={page}
          total={pagePagination.totalItems}
        />
      </div>
    </div>
  )
}

export default HomePage
