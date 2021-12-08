import { Outlet, Route, Routes } from 'react-router'
import CreateNews from '../../pages/CreateNews/CreateNews'
import HomePage from '../../pages/HomePage/HomePage'
import News from '../../pages/News/News'
import AdminLayout from '../AdminLayout/AdminLayout'
import NewsLayout from '../News/NewsLayout'

const Root = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="news/*" element={<NewsLayout />}>
          <Route index element={<News />} />
          <Route path="create-news" element={<CreateNews />} />
        </Route>
      </Routes>
      <Outlet />
    </AdminLayout>
  )
}

export default Root
