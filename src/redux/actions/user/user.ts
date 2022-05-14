import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBook } from '../../../api/book/interface'
import {
  ICreateUserRequest,
  IUpdateRequest,
  IUserById,
  IUserInfo
} from '../../../api/user/interface'
import {
  addFundApi,
  createUserApi,
  getBookByUserIdApi,
  getUserByIdApi,
  getUsersApi,
  IAddFund,
  IGetUsersResponse,
  updateUserApi
} from '../../../api/user/user'
import { IDataError, instanceOfDataError } from '../../../utils/apiErrorService'

export const getUserById = createAsyncThunk('user/getUserById', async (id: string) => {
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
  async (id: string, { rejectWithValue }) => {
    const response = await getBookByUserIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getUsers = createAsyncThunk<IGetUsersResponse | IDataError>(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    const response = await getUsersApi()
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

export const addFundAction = createAsyncThunk<IUserById | IDataError, IAddFund>(
  'user/addFund',
  async (payload: IAddFund, { rejectWithValue }) => {
    const response = await addFundApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)
