import React, { ElementType } from 'react'
import { Navigate } from 'react-router-dom'
import { getAccessToken } from '../../utils/localStorageService'

interface IPrivateRoute {
  component: ElementType
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ component: Component }) => {
  const accessToken = getAccessToken()
  return accessToken ? <Component /> : <Navigate replace to="/login" />
}

export { PrivateRoute }
