import { ITermPolicy } from '../../../api/termPolicy/interface'

export interface ITermPolicyState {
  termList: ITermPolicy[]
  policyList: ITermPolicy[]
  term?: ITermPolicy
  policy?: ITermPolicy
  termId: number
  policeId: number
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
