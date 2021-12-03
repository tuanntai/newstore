import React from 'react'
import { Route, Routes } from 'react-router'
import CreateNews from '../../pages/CreateNews/CreateNews'
import News from '../../pages/News/News'

const NewsLayout: React.FC = () => {
  return (
    <Routes>
      <Route index element={<News />} />
      <Route path="create-news" element={<CreateNews />} />
    </Routes>
  )
}

export default NewsLayout
