export enum RoleState {
  Admin = 'Admin',
  User = 'User',
  Shipper = 'Shipper',
  None = 'None'
}

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
  id: string
  username: string
  password: string
  phone: string
  fullName: string
  address: string
  soldBookAmount: number
  avatarUrl: string
  isVerify: false
  balance: number
  role: RoleState
}

export interface ICreateUserRequest {
  username: string
  password: string
  phone: string
  fullName: string
  address: string
  avatarUrl: string
  role: RoleState
}

export interface IUpdateRequest {
  avatarUrl: string
  id: string
  username: string
  password: string
  phone: string
  fullName: string
}
