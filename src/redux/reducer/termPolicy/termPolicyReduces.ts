import { createSelector, createSlice } from '@reduxjs/toolkit'
import {
  deletePolicy,
  deleteTerm,
  getTerm,
} from '../../actions/termPolicy/termPolicy'
import { ITermPolicyState } from '../../interface/termPolicy/termPolicy'
import { ITermPolicy } from '../../../api/termPolicy/interface'
import { RootState } from '../../store'

const initialState: ITermPolicyState = {
  term: [],
  policy: [],
  termInfo: {
    title: '',
    content: '',
  },
  policyInfo: {
    title: '',
    content: '',
  },
  id: 0,
  loading: false,
  success: false,
  error: null
}

const termPolicySlice = createSlice({
  name: 'termPolicy',
  initialState,
  reducers: {
    setTermPolicyId: (state, action) => {
      state.id = action.payload
    },
    resetTermPolicyProgress: (state) => {
      state.success = false
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTerm.pending, (state) => {
        state.loading = true
      })
      .addCase(getTerm.fulfilled, (state, action) => {
        state.loading = false
        state.term = action.payload
      })
      .addCase(getTerm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(deleteTerm.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTerm.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.term = state.term.filter((item: ITermPolicy) => item !== action.payload)
      })
      .addCase(deleteTerm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(deletePolicy.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.policy = state.policy.filter((item: ITermPolicy) => item !== action.payload)
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

const selectSelf = (state: RootState) => state.termPolicy
const termPolicyProgressSelector = createSelector(selectSelf, (state) => state.success)
const termPolicyErrorSelector = createSelector(selectSelf, (state) => state.error)
const termListSelector = createSelector(selectSelf, (state) => state.term)
const policyListSelector = createSelector(selectSelf, (state) => state.policy)

export const termPolicySelector = {
  termListSelector,
  termPolicyProgressSelector,
  termPolicyErrorSelector,
  policyListSelector
}
export const { resetTermPolicyProgress } = termPolicySlice.actions

export default termPolicySlice.reducer
