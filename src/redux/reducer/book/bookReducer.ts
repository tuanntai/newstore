import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { IBookState } from '../../interface/book/book'
import {
  buyBook,
  deleteBookById,
  getBookById,
  getList,
  postBook,
  uploadThumbnail
} from '../../actions/book/book'
import { notification } from 'antd'
import { IBook } from '../../../api/book/interface'

const initialState: IBookState = {
  bookId: 0,
  bookList: [],
  loading: false,
  error: null,
  thumbnailUrl: '',
  pagePagination: {
    currentPage: 0,
    limit: 0,
    totalItems: 0,
    totalPages: 0
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
        notification.success({
          message: 'Successfully',
          placement: 'topRight'
        })
      })
      .addCase(postBook.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(deleteBookById.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteBookById.fulfilled, (state, action) => {
        state.loading = false
        state.bookList = state.bookList.filter(
          (item: IBook) => item.id !== (action.payload as number)
        )
        notification.success({
          message: `Deleted Book Id ${action.payload} successfully!`,
          placement: 'topRight'
        })
      })
      .addCase(deleteBookById.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(getBookById.pending, (state) => {
        state.loading = true
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.loading = false
        state.bookInfo = action.payload
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    builder
      .addCase(getList.pending, (state) => {
        state.loading = true
      })
      .addCase(getList.fulfilled, (state, action) => {
        state.loading = false
        state.bookList = action.payload.data
        state.pagePagination.currentPage = action.payload.currentPage
        state.pagePagination.limit = action.payload.limit
        state.pagePagination.totalItems = action.payload.totalItems
        state.pagePagination.totalPages = action.payload.totalPages
      })
      .addCase(getList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    //   builder
    //     .addCase(editBook.pending, (state) => {
    //       state.loading = true
    //     })
    //     .addCase(editBook.fulfilled, (state) => {
    //       state.loading = false
    //       state.success = true
    //     })
    //     .addCase(editBook.rejected, (state, action) => {
    //       state.loading = false
    //       state.error = action.payload as string
    //     })
    builder
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
    builder.addCase(buyBook.fulfilled, (state, action) => {
      state.bookInfo = action.payload
      notification.success({ message: 'Buy Successful' })
    })
  }
})

const selectSelf = (state: RootState) => state.book

const bookListSelector = createSelector(selectSelf, (state) => state.bookList)
const bookInfoSelector = createSelector(selectSelf, (state) => state.bookInfo)
const thumbnailSelector = createSelector(selectSelf, (state) => state.thumbnailUrl)
const bookIdSelector = createSelector(selectSelf, (state) => state.bookId)
const pagePaginationBookSelector = createSelector(selectSelf, (state) => state.pagePagination)

export const bookSelectors = {
  bookListSelector,
  bookInfoSelector,
  thumbnailSelector,
  bookIdSelector,
  pagePaginationBookSelector
}
export const { setBookId } = bookSlice.actions
export default bookSlice.reducer
