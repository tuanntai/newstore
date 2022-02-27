import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import navigateReducer from './reducer/navigateReducer'
import bookReducer from './reducer/book/bookReducer'
import userReducer from './reducer/user/userReducer'
const reducer = {
  auth: authReducer,
  navigate: navigateReducer,
  book: bookReducer,
  user: userReducer
}

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
