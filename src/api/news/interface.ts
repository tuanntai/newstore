export interface IPostNewsRequest {
  tittle: string
  excerpt: string
  content: string
  isPinned: boolean
  imgUrl: string
  status: ENewsStatus
}

export enum ENewsStatus {
  PUBLIC = 'PUBLIC',
  DRAFT = 'DRAFT'
}

export interface IPostNewsResponse {
  tittle: string
  excerpt: string
  content: string
  isPinned: boolean
  imgUrl: string
  status: ENewsStatus
  timeCreated: string
  timeModified: string
  id: number
}

export interface IPinnedNews {
  id: number
  tittle: string
  imgUrl: string
  excerpt: string
}
