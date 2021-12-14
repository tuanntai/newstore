import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import navigateReducer from './reducer/navigateReducer'
import newsReducer from './reducer/news/newsReducer'
import termPolicyReduces from './reducer/termPolicy/termPolicyReduces'
const reducer = {
  auth: authReducer,
  navigate: navigateReducer,
  news: newsReducer,
  termPolicy: termPolicyReduces
}

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
