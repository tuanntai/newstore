import { ElementType } from 'react'

export interface IPrivateRoute {
  component: ElementType
  path: string
  exact?: boolean
}
