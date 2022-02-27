import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken, removeAccessToken } from '../../utils/localStorageService'
import '../AdminLayout/AdminLayout.less'

const Navbar = () => {
  const [selectedKey, setSelectedKey] = useState('')
  const accessToken = getAccessToken()

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
        <Menu.Item icon={<HomeOutlined />} key="2" onClick={() => handleLinkClick('book')}>
          <span>Book</span>
        </Menu.Item>

        {accessToken && (
          <Menu.Item icon={<HomeOutlined />} key="3" onClick={() => handleLinkClick('user')}>
            <span>User</span>
          </Menu.Item>
        )}

        <Menu.Item key="6" onClick={handleDisconnect} icon={<LogoutOutlined />}>
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar
