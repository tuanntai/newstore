import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  analyzeBookApi,
  buyBookApi,
  deleteBookByIdApi,
  getBookByIdApi,
  getListApi,
  getSellingBooksApi,
  IBuyBookResponse,
  postBookApi,
  updateBookApi,
  uploadThumbnailApi
} from '../../../api/book/book'
import {
  IAllBooksRequest,
  IAllBooksResponse,
  IBook,
  IBookAnalyzeResponse,
  IBookById,
  IBuyBookRequest,
  IPostBookRequest,
  IPostBookResponse,
  IUpdateBookRequest
} from '../../../api/book/interface'
import { Status } from '../../../pages/BookInfo/BookInfo'
import { instanceOfDataError } from '../../../utils/apiErrorService'

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

export const updateBook = createAsyncThunk(
  'book/updateBook',
  async ({ id, payload }: { id: string; payload: IUpdateBookRequest }, { rejectWithValue }) => {
    const response = await updateBookApi(id, payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return { ...response, id, data: payload }
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

export const getSellingBooks = createAsyncThunk<IAllBooksResponse, IAllBooksRequest>(
  'book/getSellingList',
  async (payload: IAllBooksRequest) => {
    const response = await getSellingBooksApi(payload)
    return response
  }
)

export const getAnalyze = createAsyncThunk<IBookAnalyzeResponse>('book/getAnalyze', async () => {
  const response = await analyzeBookApi()
  return response
})

export const uploadThumbnail = createAsyncThunk('books/uploadThumbnail', async (file: any) => {
  const response = await uploadThumbnailApi(file)
  return response
})

export const buyBook = createAsyncThunk<IBuyBookResponse, any>(
  'book/buyBook',
  async (
    { payload, setStatus }: { payload: IBuyBookRequest; setStatus: (state: Status) => void },
    { rejectWithValue }
  ) => {
    const response = await buyBookApi(payload)
    if (instanceOfDataError(response)) {
      setStatus(Status.Failed)
      return rejectWithValue(response.error)
    }
    setStatus(Status.Success)
    return response
  }
)
