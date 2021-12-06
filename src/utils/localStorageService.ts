const accessToken = 'id_token'

export const setAccessToken = (token: string) => {
  return localStorage.setItem(accessToken, token)
}

export const getAccessToken = () => {
  return localStorage.getItem(accessToken)
}

export const removeAccessToken = () => {
  return localStorage.removeItem(accessToken)
}
