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
  IBuyBookRequest,
  IPostBookRequest
} from '../../../api/book/interface'
import { instanceOfDataError } from '../../../utils/apiErrorService'

export const postBook = createAsyncThunk<string, IPostBookRequest>(
  'book/postBook',
  async (payload: IPostBookRequest) => {
    const response = await postBookApi(payload)
    return response
  }
)

export const getBookById = createAsyncThunk<IBook, number>(
  'book/getBookById',
  async (id: number, { rejectWithValue }) => {
    const response = await getBookByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const deleteBookById = createAsyncThunk('book/deleteBookById', async (id: number) => {
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
  async (payload: IBuyBookRequest) => {
    const response = await buyBookApi(payload)
    return response
  }
)
