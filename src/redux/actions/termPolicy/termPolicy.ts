import { createAsyncThunk } from '@reduxjs/toolkit'
import { IEditRequest, ITermPolicy, ITermPolicyPost } from '../../../api/termPolicy/interface'
import {
  deletePolicyApi,
  deleteTermApi,
  editPolicyApi,
  editTermApi,
  getPolicyApi,
  getPolicyByIdApi,
  getTermApi,
  getTermByIdApi,
  getTermListApi,
  postPolicyApi,
  postTermApi
} from '../../../api/termPolicy/termPolicy'
import { instanceOfDataError } from '../../../utils/apiErrorService'

export const getTerm = createAsyncThunk<ITermPolicy>(
  'termPolicy/getTerm',
  async (_, { rejectWithValue }) => {
    const response = await getTermApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getTermList = createAsyncThunk<ITermPolicy[]>(
  'termPolicy/getTerm',
  async (_, { rejectWithValue }) => {
    const response = await getTermListApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getTermById = createAsyncThunk<ITermPolicy, number>(
  'termPolicy/getTermById',
  async (id: number, { rejectWithValue }) => {
    const response = await getTermByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getPolicyById = createAsyncThunk<ITermPolicy, number>(
  'termPolicy/getPolicyById',
  async (id: number, { rejectWithValue }) => {
    const response = await getPolicyByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getPolicy = createAsyncThunk<ITermPolicy>(
  'termPolicy/getPolicy',
  async (_, { rejectWithValue }) => {
    const response = await getPolicyApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const postTerm = createAsyncThunk<ITermPolicyPost, ITermPolicy>(
  'termPolicy/postTerm',
  async ({ title, content, id }: ITermPolicyPost, { rejectWithValue }) => {
    const response = await postTermApi({ title, content, id })
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const postPolicy = createAsyncThunk<ITermPolicyPost, ITermPolicy>(
  'termPolicy/postPolicy',
  async ({ title, content, id }: ITermPolicyPost, { rejectWithValue }) => {
    const response = await postPolicyApi({ title, content, id })
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const editTerm = createAsyncThunk(
  'termPolicy/editTerm',
  async ({ id, editedData }: IEditRequest, { rejectWithValue }) => {
    const response = await editTermApi(id, editedData)
    return response
  }
)

export const editPolicy = createAsyncThunk(
  'termPolicy/editPolicy',
  async ({ id, editedData }: IEditRequest, { rejectWithValue }) => {
    const response = await editPolicyApi(id, editedData)
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
