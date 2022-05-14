export interface IAuthLoginResponse {
  data: {
    expiresIn: string
    accessToken: string
    userId: number
  }
}
