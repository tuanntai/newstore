import { createSelector, createSlice } from '@reduxjs/toolkit'
import { id } from 'date-fns/locale'
import {
  deletePolicy,
  deleteTerm,
  getPolicyById,
  getTerm,
  getTermByID
} from '../../actions/termPolicy/termPolicy'
import { ITermPolicyState } from '../../interface/termPolicy/termPolicy'
import { ITermPolicy } from '../../../api/termPolicy/interface'
import { RootState } from '../../store'

const initialState: ITermPolicyState = {
  term: [],
  policy: [],
  termInfo: {
    title: '',
    description: '',
    id: 0
  },
  policyInfo: {
    title: '',
    description: '',
    id: 0
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
      .addCase(getTermByID.pending, (state) => {
        state.loading = true
      })
      .addCase(getTermByID.fulfilled, (state, action) => {
        state.loading = false
        state.termInfo = action.payload as ITermPolicy
      })
      .addCase(getTermByID.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(getPolicyById.pending, (state) => {
        state.loading = true
      })
      .addCase(getPolicyById.fulfilled, (state, action) => {
        state.loading = false
        state.policyInfo = action.payload as ITermPolicy
      })
      .addCase(getPolicyById.rejected, (state, action) => {
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
        state.term = state.term.filter((item: ITermPolicy) => item.id !== action.payload)
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
        state.policy = state.policy.filter((item: ITermPolicy) => item.id !== action.payload)
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

const selectSelf = (state: RootState) => state.termPolicy

const termListSelector = createSelector(selectSelf, (state) => state.term)

export const termPolicySelector = {
  termListSelector
}

export default termPolicySlice.reducer
