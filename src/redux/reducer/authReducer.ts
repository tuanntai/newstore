import { createSlice } from '@reduxjs/toolkit'
import { authLogin } from '../actions/auth/auth'
import { IAuthState } from '../interface/auth/interface'
import { RootState } from '../store'
import { createSelector } from 'reselect'
import { setAccessToken, setUserIdLocal } from '../../utils/localStorageService'
import { notification } from 'antd'

const initialState: IAuthState = {
  isAuthorized: false,
  success: false,
  loading: false,
  error: null,
  accessToken: '',
  userId: 0
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetProgress: (state) => {
      state.error = null
      state.loading = false
    },
    logOut: (state) => {
      state.accessToken = ''
      state.userId = 0
      state.isAuthorized = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false
        state.accessToken = action.payload.accessToken
        state.userId = action.payload.userId
        setAccessToken(action.payload.accessToken)
        setUserIdLocal(action.payload.userId)
        state.isAuthorized = true
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        // notification.error({ message: action.payload as string })
      })
  }
})

const selectSelf = (state: RootState) => state.auth

const accessTokenSelector = createSelector(selectSelf, (state) => state.accessToken)
const authLoadingSelector = createSelector(selectSelf, (state) => state.loading)
const authMessageSelector = createSelector(selectSelf, (state) => state.error)

export const authSelectors = { accessTokenSelector, authLoadingSelector, authMessageSelector }
export const { resetProgress, logOut } = authSlice.actions
export default authSlice.reducer
