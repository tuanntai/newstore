import { Outlet } from 'react-router'
import AdminLayout from '../AdminLayout/AdminLayout'

const Root = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}

export default Root
