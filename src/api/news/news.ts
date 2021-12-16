import { IDataError } from '../../utils/apiErrorService'
import { deleteApi, getApi, patchApi, postApi } from '../../utils/apiHelper'
import { NEWS_API_URLS } from '../apiUrls'
import { INews, INewsByAlias, IPinnedNews, IPostNewsRequest, IPostNewsResponse } from './interface'

export const getPublishedApi = async () => {
  const data = await getApi<INews[]>(NEWS_API_URLS.getPublished)
  return data
}

export const postNewsApi = async ({
  title,
  excerpt,
  content,
  isPinned,
  imgUrl,
  status
}: IPostNewsRequest) => {
  const data = await postApi<IPostNewsRequest, IPostNewsResponse | IDataError>(
    NEWS_API_URLS.postNews,
    {
      title,
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
  const data = await getApi<INews[]>(NEWS_API_URLS.getDraft)
  return data
}

export const getPinnedNewsApi = async () => {
  const data = await getApi<IPinnedNews[]>(NEWS_API_URLS.getPinnedNews)
  return data
}

export const getPublishedNewsApi = async (page: number) => {
  const data = await getApi<IPinnedNews[]>(NEWS_API_URLS.getPublishedNews(page))
  return data
}

export const getNewsByAliasApi = async (alias: string) => {
  const data = await getApi<INewsByAlias>(NEWS_API_URLS.getNewsByAlias(alias))
  return data
}
export const getNewsByIdApi = async (id: number) => {
  const data = await getApi<INewsByAlias>(NEWS_API_URLS.getNewsById(id))
  return data
}

export const deleteNewsByIdApi = async (id: number) => {
  const data = await deleteApi(NEWS_API_URLS.getNewsById(id))
  return data
}

export const uploadThumbnailApi = async (file: any) => {
  const data = await postApi(NEWS_API_URLS.uploadThumbnail, file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}

export const editNewsApi = async (id: number, editedData: any) => {
  const data = await patchApi(NEWS_API_URLS.getNewsById(id), editedData)
  return data
}
