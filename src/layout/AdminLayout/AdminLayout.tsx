import { createElement, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { useAppSelector } from '../../redux/hook'
import { navigateSelector } from '../../redux/reducer/navigateReducer'
import Navbar from '../Navbar/Navbar'
import './AdminLayout.less'
import { Outlet } from 'react-router'
const { Content, Sider, Header } = Layout

const AdminLayout = ({ children }: any) => {
  const currentPage = useAppSelector(navigateSelector.currentPageSelector)
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout className="main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Mavia</div>
        <Navbar />
      </Sider>
      <Layout>
        <Header className="site-layout-background header-layout">
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            style: {
              paddingLeft: 10
            }
          })}
          <span className="currentPage-name"> {currentPage} </span>
        </Header>
        <Content className="site-layout-background content-layout">{children}</Content>
        <Outlet />
      </Layout>
    </Layout>
  )
}

export default AdminLayout
