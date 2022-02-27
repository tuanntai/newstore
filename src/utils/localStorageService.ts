const accessToken = 'id_token'
const userIdLocal = 'userId'

export const setAccessToken = (token: string) => {
  return localStorage.setItem(accessToken, token)
}

export const getAccessToken = () => {
  return localStorage.getItem(accessToken)
}

export const removeAccessToken = () => {
  return localStorage.removeItem(accessToken)
}

export const setUserIdLocal = (id: number) => {
  return localStorage.setItem(userIdLocal, id.toString())
}

export const getUserIdLocal = () => {
  return localStorage.getItem(userIdLocal)
}

export const removeUserIdLocal = () => {
  return localStorage.removeItem(userIdLocal)
}
