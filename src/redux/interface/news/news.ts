import { IPinnedNews, IPostNewsResponse } from '../../../api/news/interface'

export interface INewsState {
  newsId: number
  publishedNews: any[]
  pinnedNews: IPinnedNews[]
  postInfo: IPostNewsResponse | null
  loading: boolean
  success: boolean
  error: string | null
}
