import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAccessToken } from '../../utils/localStorageService'

const Navbar = () => {
  const [selectedKey, setSelectedKey] = useState('')

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
        <Menu.Item icon={<HomeOutlined />} key="2" onClick={() => handleLinkClick('news')}>
          <span>News</span>
        </Menu.Item>

        <Menu.Item key="6" onClick={handleDisconnect} icon={<LogoutOutlined />}>
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar
