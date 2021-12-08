import { createSlice } from '@reduxjs/toolkit'
import { authLogin } from '../actions/auth/auth'
import { IAuthState } from '../interface/auth/interface'
import { RootState } from '../store'
import { createSelector } from 'reselect'

const initialState: IAuthState = {
  isAuthorized: false,
  success: false,
  loading: false,
  error: null,
  accessToken: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetProgress: (state) => {
      state.error = null
      state.loading = false
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
        state.isAuthorized = true
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

const selectSelf = (state: RootState) => state.auth

const accessTokenSelector = createSelector(selectSelf, (state) => state.accessToken)
const authLoadingSelector = createSelector(selectSelf, (state) => state.loading)
const authMessageSelector = createSelector(selectSelf, (state) => state.error)

export const authSelectors = { accessTokenSelector, authLoadingSelector, authMessageSelector }
export const { resetProgress } = authSlice.actions
export default authSlice.reducer
