import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { IBookState } from '../../interface/book/book'
import {
  buyBook,
  deleteBookById,
  getAnalyze,
  getBookById,
  getList,
  getSellingBooks,
  postBook,
  updateBook,
  uploadThumbnail
} from '../../actions/book/book'
import { notification } from 'antd'

const initialState: IBookState = {
  bookId: '0',
  bookList: [],
  loading: false,
  error: null,
  thumbnailUrl: '',
  pagePagination: {
    currentPage: 0,
    limit: 0,
    totalItems: 0,
    totalPages: 0
  },
  sellingBooks: {
    data: [],
    currentPage: 0,
    limit: 0,
    totalItems: 0,
    totalPages: 0
  },
  analyzeBook: {
    allBook: 0,
    sellingBook: 0,
    soldBook: 0,
    totalAmount: 0,
    bookCreateByDay: []
  }
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBookId: (state, action) => {
      state.bookId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBook.pending, (state) => {
        state.loading = true
      })
      .addCase(postBook.fulfilled, (state, action) => {
        state.loading = false
        state.bookList = []
        state.bookList.unshift(action.payload.data)
        state.sellingBooks.data.unshift(action.payload.data)
        state.sellingBooks.totalItems += 1
        state.pagePagination.totalItems += 1
        notification.success({
          message: 'Successfully',
          placement: 'bottomRight'
        })
      })
      .addCase(postBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteBookById.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteBookById.fulfilled, (state, action) => {
        state.loading = false
        state.bookList = state.bookList
          .filter((item) => item.id.toString() !== action.payload.toString())
          .reverse()
        notification.success({
          message: `Deleted Book Id ${action.payload} successfully!`,
          placement: 'bottomRight'
        })
      })
      .addCase(deleteBookById.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(getBookById.pending, (state) => {
        state.loading = true
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false
        state.bookInfo = action.payload.data
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false
        const book = state.bookList.find((item) => item.id === action.payload.id)
        if (book) {
          book.title = action.payload.data.title
          book.description = action.payload.data.description
          book.imageUrl = action.payload.data.imageUrl
          book.price = action.payload.data.price
          book.author = action.payload.data.author
        }
        notification.success({ message: 'Edit Book Successful', placement: 'bottomRight' })
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        notification.warning({ message: action.payload as string, placement: 'bottomRight' })
      })

      .addCase(getList.pending, (state) => {
        state.loading = true
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false
        state.bookList = action.payload.data.data.reverse()
        state.pagePagination.currentPage = action.payload.data.currentPage
        state.pagePagination.limit = action.payload.data.limit
        state.pagePagination.totalItems = action.payload.data.totalItems
        state.pagePagination.totalPages = action.payload.data.totalPages
      })
      .addCase(getList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(getAnalyze.fulfilled, (state, action) => {
        state.analyzeBook = action.payload.data
      })
      .addCase(getSellingBooks.fulfilled, (state, action) => {
        state.loading = false
        state.sellingBooks = action.payload.data
        state.sellingBooks.data = action.payload.data.data.reverse()
      })
      .addCase(uploadThumbnail.pending, (state) => {
        state.loading = true
      })
      .addCase(uploadThumbnail.fulfilled, (state, action) => {
        state.loading = false
        state.thumbnailUrl = action.payload as string
      })
      .addCase(uploadThumbnail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(buyBook.fulfilled, (state, action) => {
        state.bookInfo = action.payload.data
        notification.success({ message: 'Buy Successful', placement: 'bottomRight' })
      })

      .addCase(buyBook.rejected, (state, action) => {
        state.error = action.payload as string
        notification.warning({ message: action.payload as string, placement: 'bottomRight' })
      })
  }
})

const selectSelf = (state: RootState) => state.book

const bookListSelector = createSelector(selectSelf, (state) => state.bookList)
const sellingBooksSelector = createSelector(selectSelf, (state) => state.sellingBooks)
const bookInfoSelector = createSelector(selectSelf, (state) => state.bookInfo)
const thumbnailSelector = createSelector(selectSelf, (state) => state.thumbnailUrl)
const bookIdSelector = createSelector(selectSelf, (state) => state.bookId)
const analyzeSelector = createSelector(selectSelf, (state) => state.analyzeBook)
const pagePaginationBookSelector = createSelector(selectSelf, (state) => state.pagePagination)

export const bookSelectors = {
  bookListSelector,
  bookInfoSelector,
  thumbnailSelector,
  bookIdSelector,
  pagePaginationBookSelector,
  sellingBooksSelector,
  analyzeSelector
}
export const { setBookId } = bookSlice.actions
export default bookSlice.reducer
