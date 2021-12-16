export enum ENewsStatus {
  PUBLIC = 'PUBLISHED',
  DRAFT = 'DRAFT'
}

export interface IPostNewsRequest {
  title: string
  excerpt: string
  content: string
  isPinned: boolean
  imgUrl: string
  status: ENewsStatus
}

export interface IPostNewsResponse {
  title: string
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
  title: string
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
  title: string
}

export interface INewsByAlias {
  id: number
  title: string
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
