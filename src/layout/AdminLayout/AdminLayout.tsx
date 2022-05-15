import { createElement, useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { navigateSelector } from '../../redux/reducer/navigateReducer'
import Navbar from '../Navbar/Navbar'
import './AdminLayout.less'
import Logo from '../../assets/img/logowhite.png'
import { useNavigate } from 'react-router-dom'
import {
  getAccessToken,
  getUserIdLocal,
  removeAccessToken,
  removeUserIdLocal
} from '../../utils/localStorageService'
import { resetUserState } from '../../redux/reducer/user/userReducer'
import { getUserById } from '../../redux/actions/user/user'
import { logOut } from '../../redux/reducer/authReducer'
import UserBox from '../../component/UserBox/UserBox'
const { Content, Sider, Header } = Layout

const AdminLayout = ({ children }: any) => {
  const currentPage = useAppSelector(navigateSelector.currentPageSelector)
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  // const userInfo = useAppSelector(userSelectors.userInfoSelector)
  const accessToken = getAccessToken()
  const userId = getUserIdLocal()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId))
    }
  }, [dispatch, userId])

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const handleLogOut = () => {
    removeAccessToken()
    dispatch(logOut())
    removeUserIdLocal()
    dispatch(resetUserState())
    navigate('/login')
  }
  return (
    <Layout className="main">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <Navbar />
      </Sider>
      <Layout>
        <Header className="site-layout-background header-layout header">
          <div>
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
              style: {
                paddingLeft: 10
              }
            })}
            <span className="currentPage-name"> {currentPage} </span>
          </div>
          <div className="login-btn">
            {accessToken ? (
              <>
                <UserBox />
                <Button type="primary" onClick={() => navigate('/add-fund')}>
                  Add Fund
                </Button>
                <Button type="primary" onClick={() => navigate('/book/create-book')}>
                  Sell Book
                </Button>
                <Button type="primary" onClick={() => handleLogOut()}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" onClick={() => navigate('signup')}>
                  Sign Up
                </Button>
                <Button type="primary" onClick={() => navigate('login')}>
                  Log In
                </Button>
              </>
            )}
          </div>
        </Header>
        <Content className="site-layout-background content-layout">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
