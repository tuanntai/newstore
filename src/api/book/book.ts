import { IDataError } from '../../utils/apiErrorService'
import { deleteApi, getApi, postApi } from '../../utils/apiHelper'
import { BOOK_API_URLS } from '../apiUrls'
import { IAllBooksRequest, IAllBooksResponse, IBook, IBuyBookRequest, IPostBookRequest } from './interface'

export const getListApi = async (payload: IAllBooksRequest) => {
  const response = getApi<IAllBooksResponse>(BOOK_API_URLS.getList(payload))
  return response
}

export const getBookByIdApi = async (id: number) => {
  const response = getApi<IBook>(BOOK_API_URLS.getBookById(id))
  return response
}

export const buyBookApi = async (payload: IBuyBookRequest) => {
  const response = postApi<IBuyBookRequest, IBook>(BOOK_API_URLS.buyBook, payload)
  return response
}

export const deleteBookByIdApi = async (id: number) => {
  const response = deleteApi<number>(BOOK_API_URLS.getBookById(id))
  return response
}

export const postBookApi = async (payload: IPostBookRequest) => {
  const response = postApi<IPostBookRequest, string>(BOOK_API_URLS.postBook, payload)
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
