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
  useEffect(() => {
    switch (selectedKey) {
      case '1': {
        return navigate('/')
      }
      case '2': {
        return navigate('/news')
      }
      case '3': {
        return navigate('/news/create-news')
      }
      default: {
        return navigate('/')
      }
    }
  }, [selectedKey, navigate])

  return (
    <div className="navbar-menu">
      <Menu mode="inline" onClick={handleClick} theme="dark" defaultSelectedKeys={['1']}>
        <Menu.Item icon={<HomeOutlined />} key="1">
          <span>Home</span>
        </Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="2">
          <span>News</span>
        </Menu.Item>
        <Menu.Item icon={<HomeOutlined />} key="3">
          <span>Create News</span>
        </Menu.Item>

        <Menu.Item key="6" onClick={handleDisconnect} icon={<LogoutOutlined />}>
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Navbar
