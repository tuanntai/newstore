import { createSlice } from '@reduxjs/toolkit'
import {
  deleteNewsById,
  editNews,
  getDraft,
  getNewsById,
  getPinnedNews,
  getPublished,
  postNews,
  uploadThumbnail
} from '../../actions/news/news'
import { INewsState } from '../../interface/news/news'
import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { INews, IPinnedNews } from '../../../api/news/interface'

const initialState: INewsState = {
  thumbnailUrl: '',
  newsId: 0,
  newsInfo: {
    timeCreated: '',
    timeModified: '',
    imgUrl: '',
    tittle: '',
    id: 0,
    content: '',
    excerpt: ''
  },
  draftNews: [],
  pinnedNews: [],
  publishedNewsByPage: [],
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
    },
    resetNewsProgress: (state) => {
      state.success = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublished.pending, (state) => {
        state.loading = true
      })
      .addCase(getPublished.fulfilled, (state, action) => {
        state.loading = false
        state.publishedNews = action.payload
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
        state.publishedNews = state.publishedNews.filter(
          (item: INews) => item.id !== action.payload
        )
        state.draftNews = state.draftNews.filter((item: INews) => item.id !== action.payload)
      })
      .addCase(deleteNewsById.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(getDraft.pending, (state) => {
        state.loading = true
      })
      .addCase(getDraft.fulfilled, (state, action) => {
        state.loading = false
        state.draftNews = action.payload
      })
      .addCase(getDraft.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(getNewsById.pending, (state) => {
        state.loading = true
      })
      .addCase(getNewsById.fulfilled, (state, action) => {
        state.loading = false
        state.newsInfo = action.payload
      })
      .addCase(getNewsById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(editNews.pending, (state) => {
        state.loading = true
      })
      .addCase(editNews.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(editNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(uploadThumbnail.pending, (state) => {
        state.loading = true
      })
      .addCase(uploadThumbnail.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.thumbnailUrl = action.payload as string
      })
      .addCase(uploadThumbnail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

const selectSelf = (state: RootState) => state.news
const publishedSelector = createSelector(selectSelf, (state) => state.publishedNews)
const thumbnailSelector = createSelector(selectSelf, (state) => state.thumbnailUrl)
const draftNewsSelector = createSelector(selectSelf, (state) => state.draftNews)
const pinnedNewsSelector = createSelector(selectSelf, (state) => state.pinnedNews)
const newsErrorSelector = createSelector(selectSelf, (state) => state.error)
const newsProgressSelector = createSelector(selectSelf, (state) => state.success)
const newsIdSelector = createSelector(selectSelf, (state) => state.newsId)
const newsInfoSelector = createSelector(selectSelf, (state) => state.newsInfo)

export const newsSelector = {
  publishedSelector,
  newsErrorSelector,
  newsProgressSelector,
  pinnedNewsSelector,
  newsIdSelector,
  draftNewsSelector,
  newsInfoSelector,
  thumbnailSelector
}
export const { setNewsId, resetNewsProgress } = newsSlice.actions
export default newsSlice.reducer
