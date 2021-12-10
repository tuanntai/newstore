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
  isPinned: boolean
  timeCreated: string
  timeModified: string
  alias: string
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

export interface INewsByAlias {
  id: number
  tittle: string
  content: string
  excerpt: string
  imgUrl: string
  timeCreated: string
  timeModified: string
  alias: string
  isPinned: boolean
}

export interface INewsEditRequest {
  id: number
  editedData: any
}
