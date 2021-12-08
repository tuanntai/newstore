import { INews, IPinnedNews, IPostNewsResponse } from '../../../api/news/interface'

export interface INewsState {
  newsId: number
  newsInfo: any
  publishedNews: INews[]
  draftNews: INews[]
  pinnedNews: IPinnedNews[]
  publishedNewsByPage: IPinnedNews[]
  postInfo: IPostNewsResponse | null
  loading: boolean
  success: boolean
  error: string | null
}
