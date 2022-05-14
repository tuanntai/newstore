export interface IPostUserRequest {
  username: string
  password: string
}

export interface IPostUserResponse {
  expiresIn: string
  accessToken: string
  userId: number
}

export interface IUserById {
  data: IUserInfo
}

export interface IUserInfo {
  id: number
  username: string
  password: string
  phone: string
  fullName: string
  address: string
  soldBookAmount: number
  avatarUrl: string
  isVerify: false
  balance: number
}

export interface ICreateUserRequest {
  username: string
  password: string
  phone: string
  fullName: string
  address: string
  avatarUrl: string
}

export interface IUpdateRequest {
  avatarUrl: string
  id: number
  username: string
  password: string
  phone: string
  fullName: string
}
