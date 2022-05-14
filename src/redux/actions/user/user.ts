import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBook } from '../../../api/book/interface'
import { ICreateUserRequest, IUpdateRequest, IUserInfo } from '../../../api/user/interface'
import {
  createUserApi,
  getBookByUserIdApi,
  getUserByIdApi,
  updateUserApi
} from '../../../api/user/user'
import { instanceOfDataError } from '../../../utils/apiErrorService'

export const getUserById = createAsyncThunk('user/getUserById', async (id: number) => {
  const response = await getUserByIdApi(id)
  return response
})

export const createUser = createAsyncThunk(
  'user/createUser',
  async (payload: ICreateUserRequest, { rejectWithValue }) => {
    const response = await createUserApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getBookByUserId = createAsyncThunk(
  'user/getBookByUserId',
  async (id: number, { rejectWithValue }) => {
    const response = await getBookByUserIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: IUpdateRequest, { rejectWithValue }) => {
    const response = await updateUserApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)
