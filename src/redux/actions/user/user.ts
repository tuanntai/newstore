import { createAsyncThunk } from '@reduxjs/toolkit'
import { AllBookById } from '../../../api/book/interface'
import { ICreateUserRequest, IUpdateRequest, IUserById } from '../../../api/user/interface'
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

export const createUser = createAsyncThunk<IUserById, ICreateUserRequest>(
  'user/createUser',
  async (payload: ICreateUserRequest, { rejectWithValue }) => {
    const response = await createUserApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getBookByUserId = createAsyncThunk<AllBookById, string>(
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

export const updateUser = createAsyncThunk<IUserById, IUpdateRequest>(
  'user/updateUser',
  async (payload: IUpdateRequest, { rejectWithValue }) => {
    const response = await updateUserApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return { ...response, newData: payload }
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
