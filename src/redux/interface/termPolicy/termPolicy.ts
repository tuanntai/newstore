import { ITermPolicy } from '../../../api/termPolicy/interface'

export interface ITermPolicyState {
  term: ITermPolicy[]
  policy: ITermPolicy[]
 
  loading: boolean
  success: boolean
  id: number
  error: string | null
  editInfo: IEditForm
}

export interface IEditForm {
  id: number
  title: string
  content: string
  type: string
}