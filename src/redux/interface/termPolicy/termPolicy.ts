import { ITermPolicy } from '../../../api/termPolicy/interface'

export interface ITermPolicyState {
  term: ITermPolicy[]
  policy: ITermPolicy[]
  termInfo: ITermPolicy
  policyInfo: ITermPolicy
  loading: boolean
  success: boolean
  id: number
  error: string | null
}
