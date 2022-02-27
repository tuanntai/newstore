export interface IAuthState {
  isAuthorized: boolean
  accessToken: string
  loading: boolean
  success: boolean
  error: string | null
  userId: number
}
