import { IAllBooksRequest } from './book/interface'

export const BOOK_API_URLS = {
  postBook: 'user-book',
  getBook: (page: number) => {
    return `user-book?page=${page}`
  },
  getList: (payload: IAllBooksRequest) =>
    `user-book/getAll?search=${payload.search}&page=${payload.page}&size=${payload.size}`,
  getBookById: (id: number) => {
    return `user-book/${id}`
  },
  buyBook: `user-book/buy`,
  uploadThumbnail: () => `s3/images`,
  getBookByUserId: (id: number) => {
    return `user-book/getBookByUserId/${id}`
  }
}

export const USER_API_URL = {
  getUser: 'users',
  getUserById: (id: number) => {
    return `users/${id}`
  }
}

export const AUTH_API_URL = {
  authLogin: 'auth/login'
}
