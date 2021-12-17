import { createSelector, createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import {
  deletePolicy,
  deleteTerm,
  editPolicy,
  editTerm,
  getPoliciesList,
  getPolicy,
  getTerm,
  getTermList,
  postPolicy,
  postTerm
} from '../../actions/termPolicy/termPolicy'
import { ITermPolicyState } from '../../interface/termPolicy/termPolicy'
import { RootState } from '../../store'

const initialState: ITermPolicyState = {
  termList: [],
  policyList: [],
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
        notification.success({
          message: 'Delete Term Successfully',
          placement: 'topRight'
        })
      })
      .addCase(deleteTerm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        notification.error({
          message: state.error,
          placement: 'topRight'
        })
      })
    builder
      .addCase(deletePolicy.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePolicy.fulfilled, (state) => {
        state.loading = false
        notification.success({
          message: 'Delete Policy Successfully',
          placement: 'topRight'
        })
      })
      .addCase(deletePolicy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        notification.error({
          message: state.error,
          placement: 'topRight'
        })
      })
    builder
      .addCase(getTermList.pending, (state) => {
        state.loading = true
      })
      .addCase(getTermList.fulfilled, (state, action) => {
        state.loading = false
        state.termList = action.payload
      })
      .addCase(getTermList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(getPoliciesList.pending, (state) => {
        state.loading = true
      })
      .addCase(getPoliciesList.fulfilled, (state, action) => {
        state.loading = false
        state.policyList = action.payload
      })
      .addCase(getPoliciesList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
    builder
      .addCase(postTerm.pending, (state) => {
        state.loading = true
      })
      .addCase(postTerm.fulfilled, (state) => {
        state.loading = false
        notification.success({
          message: 'Create Term Successfully',
          placement: 'topRight'
        })
      })
      .addCase(postTerm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        notification.error({
          message: state.error,
          placement: 'topRight'
        })
      })
    builder
      .addCase(postPolicy.pending, (state) => {
        state.loading = true
      })
      .addCase(postPolicy.fulfilled, (state) => {
        state.loading = false
        notification.success({
          message: 'Create Policy Successfully',
          placement: 'topRight'
        })
      })
      .addCase(postPolicy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        notification.error({
          message: state.error,
          placement: 'topRight'
        })
      })
    builder
      .addCase(editPolicy.pending, (state) => {
        state.loading = true
      })
      .addCase(editPolicy.fulfilled, (state) => {
        state.loading = false
        notification.success({
          message: 'Edit Policy Successfully',
          placement: 'topRight'
        })
      })
      .addCase(editPolicy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        notification.error({
          message: state.error,
          placement: 'topRight'
        })
      })
    builder
      .addCase(editTerm.pending, (state) => {
        state.loading = true
      })
      .addCase(editTerm.fulfilled, (state) => {
        state.loading = false
        notification.success({
          message: 'Edit Term Successfully',
          placement: 'topRight'
        })
      })
      .addCase(editTerm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        notification.error({
          message: state.error,
          placement: 'topRight'
        })
      })
  }
})

const selectSelf = (state: RootState) => state.termPolicy
const termPolicyProgressSelector = createSelector(selectSelf, (state) => state.success)
const termPolicyErrorSelector = createSelector(selectSelf, (state) => state.error)
const termListSelector = createSelector(selectSelf, (state) => state.termList)
const policyListSelector = createSelector(selectSelf, (state) => state.policyList)
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
