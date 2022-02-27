export interface IBook {
  id: number
  ownerId: number
  owner: string
  buyerId: number
  title: string
  author: string
  description: string
  imageUrl: string
  price: number
  startTime: string
  buyTime: string
  status: EStatus
}

export interface IPostBookRequest {
  ownerId: number
  title: string
  author: string
  description: string
  imageUrl: string
}

export interface IAllBooksRequest {
  search?: string
  size?: number
  page?: number
}

export interface IAllBooksResponse {
  data: IBook[]
  totalItems: number
  totalPages: number
  currentPage: number
  limit: number
}

export enum EStatus {
  SELLING = 'Selling',
  SOLD = 'SOLD'
}

export interface IBuyBookRequest {
  buyerId: number
  id: number
}
