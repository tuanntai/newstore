import { Avatar, Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hook'
import { userSelectors } from '../../redux/reducer/user/userReducer'
import './UserBox.less'

// import { Container } from './styles';

const UserBox: React.FC = () => {
  const user = useAppSelector(userSelectors.userInfoSelector)
  const navigate = useNavigate()
  return (
    <Button className="wrapper" onClick={() => navigate('/user')}>
      {user && user.avatarUrl ? (
        <Avatar size={'default'} icon={<img alt="avatar" src={user.avatarUrl} />} />
      ) : (
        <Avatar size={'default'} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {user.fullName.slice(0, 1)}
        </Avatar>
      )}
      <div>{user.fullName}</div>
      <div className="balance">{user.balance} $</div>
    </Button>
  )
}

export default UserBox
