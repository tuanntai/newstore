import { IAllBooksData, IAllBooksResponse, IBook, IBookAnalyze } from '../../../api/book/interface'

export interface IBookState {
  bookId: string
  loading: boolean
  bookList: IBook[]
  bookInfo?: IBook
  thumbnailUrl: string
  error: string | null
  pagePagination: IPagePagination
  sellingBooks: IAllBooksData
  analyzeBook: IBookAnalyze
}

interface IPagePagination {
  currentPage: number
  limit: number
  totalItems: number
  totalPages: number
}
