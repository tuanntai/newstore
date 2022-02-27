import { createAsyncThunk } from '@reduxjs/toolkit'
import { authLoginApi } from '../../../api/auth/auth'
import { IAuthLoginResponse } from '../../../api/auth/interface'
import { IPostUserRequest } from '../../../api/user/interface'
import { instanceOfDataError } from '../../../utils/apiErrorService'
import { setAccessToken } from '../../../utils/localStorageService'

export const authLogin = createAsyncThunk<IAuthLoginResponse, IPostUserRequest>(
  'auth/login',
  async ({ username, password }: IPostUserRequest, { rejectWithValue }) => {
    const response = await authLoginApi({ username, password })
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    setAccessToken(response.accessToken)
    return response
  }
)
