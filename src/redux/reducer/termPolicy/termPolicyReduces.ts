import { createSelector, createSlice } from '@reduxjs/toolkit'
import { deletePolicy, deleteTerm, getPolicy, getTerm } from '../../actions/termPolicy/termPolicy'
import { ITermPolicyState } from '../../interface/termPolicy/termPolicy'
import { RootState } from '../../store'

const initialState: ITermPolicyState = {
  termList: [],
  term: undefined,
  policy: undefined,
  editInfo: {
    id: 0,
    title: '',
    content: '',
    type: ''
  },
  id: 0,
  termId: 0,
  policeId: 0,
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
    },
    setEditInfo: (state, action) => {
      state.editInfo.id = action.payload.id
      state.editInfo.content = action.payload.content
      state.editInfo.title = action.payload.title
      state.editInfo.type = action.payload.type
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
      .addCase(getPolicy.pending, (state) => {
        state.loading = true
      })
      .addCase(getPolicy.fulfilled, (state, action) => {
        state.loading = false
        state.policy = action.payload
      })
      .addCase(getPolicy.rejected, (state, action) => {
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
const termPolicyIdSelector = createSelector(selectSelf, (state) => state.id)
const editInfoSelector = createSelector(selectSelf, (state) => state.editInfo)

export const termPolicySelector = {
  termListSelector,
  termPolicyProgressSelector,
  termPolicyErrorSelector,
  policyListSelector,
  termPolicyIdSelector,
  editInfoSelector
}
export const { setTermPolicyId, resetTermPolicyProgress, setEditInfo } = termPolicySlice.actions

export default termPolicySlice.reducer
