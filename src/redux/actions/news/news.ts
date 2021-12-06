import { createAsyncThunk } from '@reduxjs/toolkit'
import { IPinnedNews, IPostNewsRequest, IPostNewsResponse } from '../../../api/news/interface'
import {
  deleteNewsByIdApi,
  getDraftApi,
  getNewsByIdApi,
  getPinnedNewsApi,
  getPublishedApi,
  postNewsApi
} from '../../../api/news/news'
import { instanceOfDataError } from '../../../utils/apiErrorService'

export const getPublished = createAsyncThunk(
  'news/getPublished',
  async (_, { rejectWithValue }) => {
    const response = await getPublishedApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const postNews = createAsyncThunk<IPostNewsResponse, IPostNewsRequest>(
  'news/postNews',
  async (
    { tittle, excerpt, content, isPinned, imgUrl, status }: IPostNewsRequest,
    { rejectWithValue }
  ) => {
    const response = await postNewsApi({ tittle, excerpt, content, isPinned, imgUrl, status })
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getDraft = createAsyncThunk('news/getDraft', async (_, { rejectWithValue }) => {
  const response = await getDraftApi()
  if (instanceOfDataError(response)) {
    return rejectWithValue(response.error)
  }
  return response
})

export const getPinnedNews = createAsyncThunk<IPinnedNews[]>(
  'news/getPinnedNews',
  async (_, { rejectWithValue }) => {
    const response = await getPinnedNewsApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getNewsById = createAsyncThunk(
  'news/getNewsById',
  async (id: number, { rejectWithValue }) => {
    const response = await getNewsByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const deleteNewsById = createAsyncThunk(
  'news/deleteNewsById',
  async (id: number, { rejectWithValue }) => {
    const response = await deleteNewsByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return { response, id }
  }
)
