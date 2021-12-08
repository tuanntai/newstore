import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import CreateNews from '../../pages/CreateNews/CreateNews'
import News from '../../pages/News/News'

const NewsLayout: React.FC = () => {
  return (
    <Outlet />
  )
}

export default NewsLayout
