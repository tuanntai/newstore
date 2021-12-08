import { IDataError } from '../../utils/apiErrorService'
import { getApi, postApi } from '../../utils/apiHelper'
import { USER_API_URL } from '../apiUrls'
import { IPostUserRequest } from './interface'

export const postUserApi = async ({ email, password }: IPostUserRequest) => {
  const data = await postApi<IPostUserRequest, any | IDataError>(USER_API_URL.getUser, {
    email,
    password
  })
  return data
}


