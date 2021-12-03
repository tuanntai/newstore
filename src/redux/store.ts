import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import navigateReducer from './reducer/navigateReducer'
const reducer = {
  auth: authReducer,
  navigate: navigateReducer
}

const store = configureStore({
  reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
