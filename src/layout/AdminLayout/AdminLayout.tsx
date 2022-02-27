import { createElement, useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout } from 'antd'
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
import { resetUserState, userSelectors } from '../../redux/reducer/user/userReducer'
import { authLogin } from '../../redux/actions/auth/auth'
import { getUserById } from '../../redux/actions/user/user'
import { logOut } from '../../redux/reducer/authReducer'
const { Content, Sider, Header } = Layout

const AdminLayout = ({ children }: any) => {
  const currentPage = useAppSelector(navigateSelector.currentPageSelector)
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const userInfo = useAppSelector(userSelectors.userInfoSelector)
  const accessToken = getAccessToken()
  const userId = getUserIdLocal()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(Number(userId)))
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
                {userInfo.avatarUrl ? (
                  <Avatar size={'large'} icon={<img src={userInfo.avatarUrl} />} />
                ) : (
                  <Avatar size={'large'} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    {userInfo.fullName.slice(0, 1)}
                  </Avatar>
                )}
                <Button onClick={() => navigate('/user')}>{userInfo.fullName}</Button>
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
