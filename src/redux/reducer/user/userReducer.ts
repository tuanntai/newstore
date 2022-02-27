import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { IUserInfo } from '../../../api/user/interface'
import { createUser, getBookByUserId, getUserById, updateUser } from '../../actions/user/user'
import { IBook } from '../../../api/book/interface'

export interface IUserState {
  loading: boolean
  error: null | string
  userInfo: IUserInfo
  listBook: IBook[]
}

const initialState: IUserState = {
  loading: false,
  error: null,
  userInfo: {
    address: '',
    avatarUrl: '',
    balance: 0,
    email: '',
    fullName: '',
    id: 0,
    isVerify: false,
    password: '',
    phone: '',
    soldBookAmount: 0,
    username: ''
  },
  listBook: []
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
        email: '',
        fullName: '',
        id: 0,
        isVerify: false,
        password: '',
        phone: '',
        soldBookAmount: 0,
        username: ''
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
      .addCase(getBookByUserId.fulfilled, (state, action) => {
        state.listBook = action.payload.reverse()
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload
      })
  }
})

const selectSelf = (state: RootState) => state.user

const userInfoSelector = createSelector(selectSelf, (state) => state.userInfo)
const userListBookSelector = createSelector(selectSelf, (state) => state.listBook)

export const userSelectors = { userInfoSelector, userListBookSelector }

export const { resetUserState } = userSlice.actions

export default userSlice.reducer
