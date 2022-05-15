export enum DeliveryState {
  None = 'None',
  Waiting = 'Waiting',
  Shipping = 'Shipping',
  Done = 'Done'
}

export interface IBook {
  id: string
  ownerId: string
  owner: string
  buyerId: string
  title: string
  author: string
  description: string
  imageUrl: string
  price: number
  startTime: string
  buyTime: string
  status: EBookStatus
  deliveryState: DeliveryState
}

export interface IBookById {
  data: IBook
}

export interface AllBookById {
  data: IBook[]
}

export interface IPostBookRequest {
  ownerId: string
  title: string
  author: string
  description: string
  imageUrl: string
}

export interface IUpdateBookRequest {
  ownerId: string
  buyerId: string
  price: number
  title: string
  author: string
  description: string
  imageUrl: string
  startTime: string
  buyTime: string
  status: EBookStatus
  deliveryState: DeliveryState
}

export interface IAllBooksRequest {
  search?: string
  size?: number
  page?: number
  order?: EOrder
  status?: string
}

export interface IPostBookResponse {
  data: IBook
}

export enum EOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}
export interface IAllBooksResponse {
  data: {
    data: IBook[]
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export enum EBookStatus {
  SELLING = 'Selling',
  SOLD = 'SOLD',
  ALL = ''
}

export interface IBuyBookRequest {
  buyerId: string
  id: string
}
