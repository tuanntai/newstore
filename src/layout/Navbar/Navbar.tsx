import {
  BookOutlined,
  CarOutlined,
  HomeOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RoleState } from '../../api/user/interface'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { logOut } from '../../redux/reducer/authReducer'
import { navigateSelector } from '../../redux/reducer/navigateReducer'
import { resetUserState, userSelectors } from '../../redux/reducer/user/userReducer'
import {
  getAccessToken,
  removeAccessToken,
  removeUserIdLocal
} from '../../utils/localStorageService'
import '../AdminLayout/AdminLayout.less'

const Navbar = () => {
  const currentPage = useAppSelector(navigateSelector.currentPageSelector)
  const accessToken = getAccessToken()
  const user = useAppSelector(userSelectors.userInfoSelector)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleLogOut = () => {
    removeAccessToken()
    dispatch(logOut())
    removeUserIdLocal()
    dispatch(resetUserState())
    navigate('/login')
  }

  const handleLinkClick = (link: string) => {
    navigate(link)
  }

  return (
    <div className="navbar-menu">
      <Menu mode="inline" defaultActiveFirst theme="dark" activeKey={currentPage}>
        <Menu.Item icon={<HomeOutlined />} key="Home Page" onClick={() => handleLinkClick('/')}>
          <span>Home</span>
        </Menu.Item>
        {accessToken && user && (
          <>
            {[RoleState.Admin, RoleState.User, RoleState.Shipper].includes(user.role) && (
              <Menu.Item icon={<UserOutlined />} key="User" onClick={() => handleLinkClick('user')}>
                <span>User </span>
              </Menu.Item>
            )}
            {[RoleState.Admin, RoleState.User].includes(user.role) && (
              <Menu.Item
                icon={<BookOutlined />}
                key="Book"
                onClick={() => handleLinkClick('book-manager')}
              >
                <span>Book Manager</span>
              </Menu.Item>
            )}
            {[RoleState.Admin].includes(user.role) && (
              <Menu.Item
                icon={<UsergroupAddOutlined />}
                key="User manager"
                onClick={() => handleLinkClick('user-manager')}
              >
                <span>User Manager</span>
              </Menu.Item>
            )}
            {[RoleState.Admin, RoleState.User].includes(user.role) && (
              <Menu.Item
                icon={<UsergroupAddOutlined />}
                key="Receipt"
                onClick={() => handleLinkClick('receipt')}
              >
                <span>Receipt</span>
              </Menu.Item>
            )}
            {[RoleState.Admin, RoleState.Shipper].includes(user.role) && (
              <Menu.Item
                icon={<CarOutlined />}
                key="Delivery"
                onClick={() => handleLinkClick('delivery')}
              >
                <span>Delivery</span>
              </Menu.Item>
            )}

            {[RoleState.Admin].includes(user.role) && (
              <Menu.Item
                icon={<CarOutlined />}
                key="Analyze"
                onClick={() => handleLinkClick('analyze')}
              >
                <span>Analyze</span>
              </Menu.Item>
            )}

            <Menu.Item key="6" onClick={handleLogOut} icon={<LogoutOutlined />}>
              <span>Logout</span>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  )
}

export default Navbar
