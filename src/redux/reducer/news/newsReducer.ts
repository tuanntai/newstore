import { createSlice } from '@reduxjs/toolkit'
import { deleteNewsById, getPinnedNews, getPublished, postNews } from '../../actions/news/news'
import { INewsState } from '../../interface/news/news'
import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { IPinnedNews } from '../../../api/news/interface'

const initialState: INewsState = {
  newsId: 0,
  pinnedNews: [],
  postInfo: null,
  publishedNews: [],
  loading: false,
  success: false,
  error: null
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsId: (state, action) => {
      state.newsId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublished.pending, (state) => {
        state.loading = true
      })
      .addCase(getPublished.fulfilled, (state, action) => {
        state.loading = false
        state.publishedNews = action.payload as any
      })
      .addCase(getPublished.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(postNews.pending, (state) => {
        state.loading = true
      })
      .addCase(postNews.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.postInfo = action.payload
      })
      .addCase(postNews.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload as string
      })
    builder
      .addCase(getPinnedNews.pending, (state) => {
        state.loading = true
      })
      .addCase(getPinnedNews.fulfilled, (state, action) => {
        state.loading = false
        state.pinnedNews = action.payload
      })
      .addCase(getPinnedNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(deleteNewsById.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteNewsById.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.pinnedNews = state.pinnedNews.filter(
          (item: IPinnedNews) => item.id !== action.payload
        )
        state.publishedNews = state.pinnedNews.filter((item: any) => item.id !== action.payload)
      })
      .addCase(deleteNewsById.rejected, (state, action) => {
        state.loading = false
        state.success = true
        state.error = action.payload as string
      })
  }
})

const selectSelf = (state: RootState) => state.news
const publishedSelector = createSelector(selectSelf, (state) => state.publishedNews)
const pinnedNewsSelector = createSelector(selectSelf, (state) => state.pinnedNews)
const newsErrorSelector = createSelector(selectSelf, (state) => state.error)
const newsProgressSelector = createSelector(selectSelf, (state) => state.success)
const newsIdSelector = createSelector(selectSelf, (state) => state.newsId)

export const newsSelector = {
  publishedSelector,
  newsErrorSelector,
  newsProgressSelector,
  pinnedNewsSelector,
  newsIdSelector
}
export const { setNewsId } = newsSlice.actions
export default newsSlice.reducer
