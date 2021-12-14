import { createAsyncThunk } from '@reduxjs/toolkit'
import { ITermPolicy } from '../../../api/termPolicy/interface'
import {
  deletePolicyApi,
  deleteTermApi,
  editPolicyApi,
  editTermApi,
  getPolicyByIdApi,
  getTermApi,
  getTermByIdApi
} from '../../../api/termPolicy/termPolicy'
import { instanceOfDataError } from '../../../utils/apiErrorService'

export const getTerm = createAsyncThunk<ITermPolicy[]>(
  'termPolicy/getTerm',
  async (_, { rejectWithValue }) => {
    const response = await getTermApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getPolicyById = createAsyncThunk(
  'termPolicy/getPolicyById',
  async (id: number, { rejectWithValue }) => {
    const response = await getPolicyByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getTermByID = createAsyncThunk(
  'termPolicy/getTermById',
  async (id: number, { rejectWithValue }) => {
    const response = await getTermByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const editTerm = createAsyncThunk(
  'termPolicy/editTerm',
  async ({ id, description, title }: ITermPolicy, { rejectWithValue }) => {
    const response = await editTermApi({ id, description, title })
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const editPolicy = createAsyncThunk(
  'termPolicy/editPolicy',
  async ({ id, description, title }: ITermPolicy, { rejectWithValue }) => {
    const response = await editPolicyApi({ id, description, title })
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const deleteTerm = createAsyncThunk('termPolicy/deleteTerm', async (id: number) => {
  const response = await deleteTermApi(id)
  return response
})

export const deletePolicy = createAsyncThunk('termPolicy/deletePolicy', async (id: number) => {
  const response = await deletePolicyApi(id)
  return response
})
