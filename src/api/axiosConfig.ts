import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getAccessToken } from '../utils/localStorageService'
const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
axiosConfig.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axiosConfig.interceptors.response.use(
  function (response: AxiosResponse) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default axiosConfig
