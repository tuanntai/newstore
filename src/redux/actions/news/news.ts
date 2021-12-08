import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  INews,
  INewsById,
  INewsEditRequest,
  IPinnedNews,
  IPostNewsRequest,
  IPostNewsResponse
} from '../../../api/news/interface'
import {
  deleteNewsByIdApi,
  editNewsApi,
  getDraftApi,
  getNewsByIdApi,
  getPinnedNewsApi,
  getPublishedApi,
  getPublishedNewsApi,
  postNewsApi,
  uploadThumbnailApi
} from '../../../api/news/news'
import { instanceOfDataError } from '../../../utils/apiErrorService'

export const getPublished = createAsyncThunk<INews[]>(
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

export const getDraft = createAsyncThunk<INews[]>(
  'news/getDraft',
  async (_, { rejectWithValue }) => {
    const response = await getDraftApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

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

export const getPublishedNews = createAsyncThunk(
  'news/getPublishedNews',
  async (page: number, { rejectWithValue }) => {
    const response = await getPublishedNewsApi(page)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getNewsById = createAsyncThunk<INewsById, number>(
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
    return response
  }
)

export const uploadThumbnail = createAsyncThunk('news/uploadThumbnail', async (file: any) => {
  const response = await uploadThumbnailApi(file)
  return response
})

export const editNews = createAsyncThunk(
  'news/editNews',
  async ({ editedData, id }: INewsEditRequest, { rejectWithValue }) => {
    const response = await editNewsApi(id, editedData)
    return response
  }
)
