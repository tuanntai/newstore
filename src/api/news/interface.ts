export enum ENewsStatus {
  PUBLIC = 'PUBLISHED',
  DRAFT = 'DRAFT'
}

export interface IPostNewsRequest {
  tittle: string
  excerpt: string
  content: string
  isPinned: boolean
  imgUrl: string
  status: ENewsStatus
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

export interface INews {
  content: string
  excerpt: string
  id: number
  imgUrl: string
  isPinned: boolean
  status: ENewsStatus
  timeCreated: string
  timeModified: string
  tittle: string
}
