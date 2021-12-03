import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'

const News: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setCurrentPage('News'))
  }, [dispatch])
  const handleCreate = () => {
    navigate('news/create-news')
  }
  return (
    <div className="news-wrapper">
      <div className="heading">
        <Typography>News List</Typography>
        <Button icon={<PlusOutlined />} onClick={handleCreate}>
          Create Task
        </Button>
      </div>
    </div>
  )
}

export default News
