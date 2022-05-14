import { Button, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import ListTable from '../../component/ListTable/ListTable'
import { getUsers } from '../../redux/actions/user/user'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { setCurrentPage } from '../../redux/reducer/navigateReducer'
import { userSelectors } from '../../redux/reducer/user/userReducer'
import AddUserModal from './components/Modal/AddUserModal/AddUserModal'

// import { Container } from './styles';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Sold Book Amount',
    dataIndex: 'soldBookAmount',
    key: 'soldBookAmount'
  },
  {
    title: 'Verify',
    dataIndex: 'isVerify',
    key: 'isVerify'
  }
]

const UserManager: React.FC = () => {
  const dispatch = useAppDispatch()
  const [showAddModal, setShowAddModal] = useState(false)
  const users = useAppSelector(userSelectors.usersBookSelector)

  useEffect(() => {
    dispatch(setCurrentPage('User manager'))
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div className="book-wrapper">
      <div className="heading">
        <Typography className="heading-title">User List</Typography>
        <Button type="primary" onClick={() => setShowAddModal(true)}>
          Add User
        </Button>
      </div>
      <ListTable
        title="List Of Book"
        dataSource={users}
        pagination={false}
        columns={columns}
        scroll={{ x: 'auto' }}
      />

      {/* <Modal
          title={`Delete Book Id ${bookId}`}
          visible={showModal}
          onOk={() => deleteBook(bookId)}
          onCancel={handleCancel}
          cancelText="Cancel"
          okText="Delete"
        >
          Are you sure ?
        </Modal> */}

      <AddUserModal showModal={showAddModal} setShowModal={setShowAddModal} />
    </div>
  )
}

export default UserManager
