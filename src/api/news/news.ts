import { IDataError } from '../../utils/apiErrorService'
import { deleteApi, getApi, postApi } from '../../utils/apiHelper'
import { NEWS_API_URLS } from '../apiUrls'
import { IPinnedNews, IPostNewsRequest, IPostNewsResponse } from './interface'

export const getPublishedApi = async () => {
  const data = await getApi(NEWS_API_URLS.getPublished)
  return data
}

export const postNewsApi = async ({
  tittle,
  excerpt,
  content,
  isPinned,
  imgUrl,
  status
}: IPostNewsRequest) => {
  const data = await postApi<IPostNewsRequest, IPostNewsResponse | IDataError>(
    NEWS_API_URLS.postNews,
    {
      tittle,
      excerpt,
      content,
      isPinned,
      imgUrl,
      status
    }
  )
  return data
}

export const getDraftApi = async () => {
  const data = await getApi(NEWS_API_URLS.getDraft)
  return data
}

export const getPinnedNewsApi = async () => {
  const data = await getApi<IPinnedNews[]>(NEWS_API_URLS.getPinnedNews)
  return data
}

export const getNewsByIdApi = async (id: number) => {
  const data = await getApi(NEWS_API_URLS.getNewsById(id))
  return data
}

export const deleteNewsByIdApi = async (id: number) => {
  const data = await deleteApi(NEWS_API_URLS.getNewsById(id))
  return data
}
