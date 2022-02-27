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

export const getUserById = createAsyncThunk<IUserInfo, number>(
  'user/getUserById',
  async (id: number, { rejectWithValue }) => {
    const response = await getUserByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const createUser = createAsyncThunk<IUserInfo, ICreateUserRequest>(
  'user/createUser',
  async (payload: ICreateUserRequest, { rejectWithValue }) => {
    const response = await createUserApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getBookByUserId = createAsyncThunk<IBook[], number>(
  'user/getBookByUserId',
  async (id: number, { rejectWithValue }) => {
    const response = await getBookByUserIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const updateUser = createAsyncThunk<IUserInfo,IUpdateRequest>(
  'user/updateUser',
  async (payload: IUpdateRequest, { rejectWithValue }) => {
    const response = await updateUserApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)
