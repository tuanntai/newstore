import { IBook } from '../../../api/book/interface'

export interface IBookState {
  bookId: number
  loading: boolean
  bookList: IBook[]
  bookInfo?: IBook
  thumbnailUrl: string
  error: string | null
  pagePagination: IPagePagination
}

interface IPagePagination {
  currentPage: number
  limit: number
  totalItems: number
  totalPages: number
}
