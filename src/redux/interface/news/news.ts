import { INews, INewsByAlias, IPinnedNews, IPostNewsResponse } from '../../../api/news/interface'

export interface INewsState {
  thumbnailUrl: string
  newsId: number
  newsInfo: INewsByAlias
  publishedNews: INews[]
  draftNews: INews[]
  pinnedNews: IPinnedNews[]
  publishedNewsByPage: IPinnedNews[]
  postInfo: IPostNewsResponse | null
  loading: boolean
  success: boolean
  error: string | null
}
