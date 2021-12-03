import { createElement, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import { useAppSelector } from '../../redux/hook'
import { navigateSelector } from '../../redux/reducer/navigateReducer'
import Navbar from '../Navbar/Navbar'
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
        <div
          className="logo"
          style={{
            textAlign: 'center',
            height: 60,
            padding: 14,
            color: '#fff',
            fontSize: 20
          }}
        >
          Mavia
        </div>
        <Navbar />
      </Sider>
      <Layout>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: '#fff',
            borderBottom: '1px solid #ccc'
          }}
        >
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            style: {
              paddingLeft: 10
            }
          })}
          <span style={{ padding: '20px', fontWeight: 700, fontSize: 15 }}> {currentPage} </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '0  16px',
            padding: 24,
            minHeight: '100vh'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
