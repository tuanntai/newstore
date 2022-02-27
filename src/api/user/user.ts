import { IDataError } from '../../utils/apiErrorService'
import { getApi, patchApi, postApi } from '../../utils/apiHelper'
import { BOOK_API_URLS, USER_API_URL } from '../apiUrls'
import { IBook } from '../book/interface'
import {
  ICreateUserRequest,
  IPostUserRequest,
  IPostUserResponse,
  IUpdateRequest,
  IUserInfo
} from './interface'

export const postUserApi = async ({ username, password }: IPostUserRequest) => {
  const data = await postApi<IPostUserRequest, IPostUserResponse | IDataError>(
    USER_API_URL.getUser,
    {
      username,
      password
    }
  )
  return data
}

export const getUserByIdApi = async (id: number) => {
  const data = await getApi<IUserInfo>(USER_API_URL.getUserById(id))
  return data
}

export const createUserApi = async (payload: ICreateUserRequest) => {
  const data = await postApi<ICreateUserRequest, IUserInfo | IDataError>(
    USER_API_URL.getUser,
    payload
  )
  return data
}

export const getBookByUserIdApi = async (id: number) => {
  const data = await getApi<IBook[]>(BOOK_API_URLS.getBookByUserId(id))
  return data
}

export const updateUserApi = async (payload: IUpdateRequest) => {
  const data = await patchApi<IUpdateRequest, IUserInfo | IDataError>(USER_API_URL.getUser, payload)
  return data
}
