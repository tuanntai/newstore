import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  buyBookApi,
  deleteBookByIdApi,
  getBookByIdApi,
  getListApi,
  postBookApi,
  uploadThumbnailApi
} from '../../../api/book/book'
import {
  IAllBooksRequest,
  IAllBooksResponse,
  IBook,
  IBookById,
  IBuyBookRequest,
  IPostBookRequest,
  IPostBookResponse
} from '../../../api/book/interface'
import { IDataError, instanceOfDataError } from '../../../utils/apiErrorService'

export const postBook = createAsyncThunk<IPostBookResponse, IPostBookRequest>(
  'book/postBook',
  async (payload: IPostBookRequest, { rejectWithValue }) => {
    const response = await postBookApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getBookById = createAsyncThunk<IBookById, string>(
  'book/getBookById',
  async (id: string, { rejectWithValue }) => {
    const response = await getBookByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const deleteBookById = createAsyncThunk('book/deleteBookById', async (id: string) => {
  const response = await deleteBookByIdApi(id)
  return response
})

export const getList = createAsyncThunk<IAllBooksResponse, IAllBooksRequest>(
  'book/getList',
  async (payload: IAllBooksRequest) => {
    const response = await getListApi(payload)
    return response
  }
)

export const uploadThumbnail = createAsyncThunk('books/uploadThumbnail', async (file: any) => {
  const response = await uploadThumbnailApi(file)
  return response
})

export const buyBook = createAsyncThunk<IBook, IBuyBookRequest>(
  'book/buyBook',
  async (payload: IBuyBookRequest, { rejectWithValue }) => {
    const response = await buyBookApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)
