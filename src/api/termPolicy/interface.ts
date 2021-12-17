export interface ITermPolicyPost {
  id: number
  title: string
  content: string
}

export interface ITermPolicy {
  id: number
  title: string
  content: string
}

export enum ETermPolicyStatus {
  TERM = 'TERM',
  POLICY = 'POLICY'
}

export interface IEditRequest {
  id: number
  editedData: any
}
