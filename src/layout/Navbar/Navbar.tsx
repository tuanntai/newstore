import {
  BookOutlined,
  CarOutlined,
  HomeOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleState } from '../../api/user/interface'
import { useAppSelector } from '../../redux/hook'
import { userSelectors } from '../../redux/reducer/user/userReducer'
import { getAccessToken, removeAccessToken } from '../../utils/localStorageService'
import '../AdminLayout/AdminLayout.less'

const Navbar = () => {
  const [selectedKey, setSelectedKey] = useState('')
  const accessToken = getAccessToken()
  const user = useAppSelector(userSelectors.userInfoSelector)

  const handleClick = (e: any) => {
    setSelectedKey(e.key)
  }

  const handleDisconnect = () => {
    removeAccessToken()
    navigate('/login')
  }

  const navigate = useNavigate()

  const handleLinkClick = (link: string) => {
    navigate(link)
  }

  return (
    <div className="navbar-menu">
      <Menu mode="inline" onClick={handleClick} theme="dark" defaultSelectedKeys={['1']}>
        <Menu.Item icon={<HomeOutlined />} key="1" onClick={() => handleLinkClick('/')}>
          <span>Home</span>
        </Menu.Item>
        {accessToken && (
          <>
            {[RoleState.Admin, RoleState.User, RoleState.Shipper].includes(user.role) && (
              <Menu.Item icon={<UserOutlined />} key="2" onClick={() => handleLinkClick('user')}>
                <span>User </span>
              </Menu.Item>
            )}
            {[RoleState.Admin].includes(user.role) && (
              <Menu.Item
                icon={<BookOutlined />}
                key="3"
                onClick={() => handleLinkClick('book-manager')}
              >
                <span>Book Manager</span>
              </Menu.Item>
            )}
            {[RoleState.Admin].includes(user.role) && (
              <Menu.Item
                icon={<UsergroupAddOutlined />}
                key="4"
                onClick={() => handleLinkClick('user-manager')}
              >
                <span>User Manager</span>
              </Menu.Item>
            )}
            {[RoleState.Admin, RoleState.Shipper].includes(user.role) && (
              <Menu.Item icon={<CarOutlined />} key="5" onClick={() => handleLinkClick('delivery')}>
                <span>Delivery</span>
              </Menu.Item>
            )}

            <Menu.Item key="6" onClick={handleDisconnect} icon={<LogoutOutlined />}>
              <span>Logout</span>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  )
}

export default Navbar
