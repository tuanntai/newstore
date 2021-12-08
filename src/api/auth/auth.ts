import { IDataError } from '../../utils/apiErrorService'
import { postApi } from '../../utils/apiHelper'
import { AUTH_API_URL } from '../apiUrls'
import { IPostUserRequest } from '../user/interface'
import { IAuthLoginResponse } from './interface'

export const authLoginApi = async ({ email, password }: IPostUserRequest) => {
  const data = await postApi<IPostUserRequest, IAuthLoginResponse | IDataError>(
    AUTH_API_URL.authLogin,
    {
      email,
      password
    }
  )
  return data
}
