export const NEWS_API_URLS = {
  postNews: '/news',
  getPublished: '/news/published',
  getDraft: '/news/draft',
  getPinnedNews: '/news/pinnedNews',
  getNewsById: (id: number) => {
    return `/news/${id}`
  },
  getPublishedNews: (page: number) => {
    return `news/publishedNews?page=${page}`
  }
}
