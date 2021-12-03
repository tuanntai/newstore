import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from '../interface/auth/interface'

const initialState: IAuthState = {
  isAuthorized: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
})

export default authSlice.reducer
