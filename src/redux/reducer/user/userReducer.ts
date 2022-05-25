import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { IUserInfo, RoleState } from '../../../api/user/interface'
import {
  addFundAction,
  createUser,
  getBookByUserId,
  getUserById,
  getUsers,
  updateUser
} from '../../actions/user/user'
import { IBook } from '../../../api/book/interface'
import { getAccessToken } from '../../../utils/localStorageService'
import { notification } from 'antd'

export interface IUserState {
  loading: boolean
  error: null | string
  userInfo: IUserInfo
  listBook: IBook[]
  users: IUserInfo[]
}

const initialState: IUserState = {
  loading: false,
  error: null,
  userInfo: {
    address: '',
    avatarUrl: '',
    balance: 0,
    fullName: '',
    id: '0',
    isVerify: false,
    password: '',
    phone: '',
    soldBookAmount: 0,
    username: '',
    role: RoleState.None
  },
  listBook: [],
  users: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.userInfo = {
        address: '',
        avatarUrl: '',
        balance: 0,
        fullName: '',
        id: '0',
        isVerify: false,
        password: '',
        phone: '',
        soldBookAmount: 0,
        username: '',
        role: RoleState.None
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userInfo = action.payload.data
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const accessToken = getAccessToken()
        if (!accessToken) state.userInfo = action.payload.data
        state.users.push(action.payload.data)
      })
      .addCase(getBookByUserId.fulfilled, (state, action) => {
        state.listBook = action.payload.data.reverse()
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.data
      })
      .addCase(addFundAction.fulfilled, (state, action: any) => {
        state.userInfo.balance = action.payload.data.balance
        notification.success({
          message: `Adding Fund Successful! Your balance now: ${action.payload.data.balance}`,
          placement: 'bottomRight'
        })
      })
      .addCase(getUsers.fulfilled, (state, action: any) => {
        state.users = action.payload.data
      })
  }
})

const selectSelf = (state: RootState) => state.user

const userInfoSelector = createSelector(selectSelf, (state) => state.userInfo)
const userListBookSelector = createSelector(selectSelf, (state) => state.listBook)
const usersBookSelector = createSelector(selectSelf, (state) => state.users)

export const userSelectors = { userInfoSelector, userListBookSelector, usersBookSelector }

export const { resetUserState } = userSlice.actions

export default userSlice.reducer
