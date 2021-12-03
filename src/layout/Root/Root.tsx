import { Route, Routes } from 'react-router'
import CreateNews from '../../pages/CreateNews/CreateNews'
import HomePage from '../../pages/HomePage/HomePage'
import AdminLayout from '../AdminLayout/AdminLayout'
import NewsLayout from '../News/NewsLayout'

const Root = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="news/*" element={<NewsLayout />}>
          <Route path="create-news" element={<CreateNews />} />
        </Route>
      </Routes>
    </AdminLayout>
  )
}

export default Root
