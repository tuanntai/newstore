import { INews, INewsById, IPinnedNews, IPostNewsResponse } from '../../../api/news/interface'

export interface INewsState {
  thumbnailUrl: string
  newsId: number
  newsInfo: INewsById
  publishedNews: INews[]
  draftNews: INews[]
  pinnedNews: IPinnedNews[]
  publishedNewsByPage: IPinnedNews[]
  postInfo: IPostNewsResponse | null
  loading: boolean
  success: boolean
  error: string | null
}
