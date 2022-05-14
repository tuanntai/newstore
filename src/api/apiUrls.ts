import { IAllBooksRequest } from './book/interface'

export const BOOK_API_URLS = {
  postBook: 'user-book',
  getBook: (page: number) => {
    return `user-book?page=${page}`
  },
  getList: (payload: IAllBooksRequest) =>
    `user-book/getAll?search=${payload.search}&page=${payload.page}&size=${payload.size}&order=${payload.order}&status=${payload.status}`,
  getBookById: (id: string) => {
    return `user-book/${id}`
  },
  buyBook: `user-book/buy`,
  uploadThumbnail: () => `s3/images`,
  getBookByUserId: (id: string) => {
    return `user-book/getBookByUserId/${id}`
  }
}

export const USER_API_URL = {
  getUser: 'users',
  getUserById: (id: string) => {
    return `users/${id}`
  },
  addFund: 'users/addFund',
  getAll: 'users/getAll'
}

export const AUTH_API_URL = {
  authLogin: 'auth/login'
}
