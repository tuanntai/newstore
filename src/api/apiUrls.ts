export const NEWS_API_URLS = {
  postNews: '/news',
  getNews: (
    page: number,
    sortby: {
      timeCreated: string
    },
    order: string
  ) => {
    return `/news?page=${page}&sortBy=${sortby}&order=${order}`
  },
  getPublished: '/news/published',
  getDraft: '/news/draft',
  getPinnedNews: '/news/pinnedNews',
  getNewsByAlias: (alias: string) => {
    return `/news/${alias}`
  },
  getNewsById: (id: number) => {
    return `/news/${id}`
  },
  getPublishedNews: (page: number) => {
    return `news/publishedNews?page=${page}`
  },
  uploadThumbnail: '/s3/images'
}

export const USER_API_URL = {
  getUser: '/users',
  getUserById: (id: number) => {
    return `/users/${id}`
  }
}

export const AUTH_API_URL = {
  authLogin: '/auth/login'
}

export const TERM_POLICY_API_URL = {
  getTerm: '/term-policy/term',
  getTermList: '/term-policy/terms',
  getTermById: (id: number) => {
    return `/term-policy/term/${id}`
  },
  getPolicy: '/term-policy/policy',
  getPolicies: '/term-policy/policies',
  getPolicyById: (id: number) => {
    return `/term-policy/policy/${id}`
  }
}
