import { createSlice } from '@reduxjs/toolkit'
import { INavigateState } from '../interface/navigate/interface'
import { RootState } from '../store'
import { createSelector } from 'reselect'

const initialState: INavigateState = {
  currentPage: ''
}

const navigateSlice = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    }
  }
})

const selectSelf = (state: RootState) => state.navigate

const currentPageSelector = createSelector(selectSelf, (state) => state.currentPage)

export const navigateSelector = {
  currentPageSelector
}

export const { setCurrentPage } = navigateSlice.actions
export default navigateSlice.reducer
