import { IDataError } from '../../utils/apiErrorService'
import { deleteApi, getApi, postApi, putApi } from '../../utils/apiHelper'
import { BOOK_API_URLS } from '../apiUrls'
import {
  IAllBooksRequest,
  IAllBooksResponse,
  IBook,
  IBookById,
  IBuyBookRequest,
  IPostBookRequest,
  IPostBookResponse,
  IUpdateBookRequest
} from './interface'

export const getListApi = async (payload: IAllBooksRequest) => {
  const response = await getApi<IAllBooksResponse>(BOOK_API_URLS.getList(payload))
  return response
}

export const getBookByIdApi = async (id: string) => {
  const response = await getApi<IBookById>(BOOK_API_URLS.getBookById(id))
  return response
}

export const buyBookApi = async (payload: IBuyBookRequest) => {
  const response = await postApi<IBuyBookRequest, IBook>(BOOK_API_URLS.buyBook, payload)
  return response
}

export const deleteBookByIdApi = async (id: string) => {
  const response = await deleteApi<string>(BOOK_API_URLS.getBookById(id))
  return response
}

export const postBookApi = async (payload: IPostBookRequest) => {
  const response = await postApi<IPostBookRequest, IPostBookResponse | IDataError>(
    BOOK_API_URLS.postBook,
    payload
  )
  return response
}

export const uploadThumbnailApi = async (file: any) => {
  const data = await postApi(BOOK_API_URLS.uploadThumbnail(), file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}

export const updateBookApi = async (id: string, payload: IUpdateBookRequest) => {
  const response = await putApi<IUpdateBookRequest, any | IDataError>(
    BOOK_API_URLS.getBookById(id),
    payload
  )
  return response
}
