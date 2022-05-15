import { createSelector, createSlice } from '@reduxjs/toolkit'
import { IReceipt } from '../../../api/receipt/receipt'
import {
  getReceiptById,
  getReceipts,
  getReceiptsByBuyer,
  getReceiptsBySeller
} from '../../actions/receipt/receipt'

import { RootState } from '../../store'

export interface IReceiptState {
  receipts: IReceipt[]
  receiptsBySeller: IReceipt[]
  receiptsByBuyer: IReceipt[]
  receipt?: IReceipt
}

const initialState: IReceiptState = {
  receipts: [],
  receiptsByBuyer: [],
  receiptsBySeller: []
}

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReceipts.fulfilled, (state, action) => {
        state.receipts = action.payload.data
      })
      .addCase(getReceiptsBySeller.fulfilled, (state, action) => {
        state.receiptsBySeller = action.payload.data
      })
      .addCase(getReceiptsByBuyer.fulfilled, (state, action) => {
        state.receiptsByBuyer = action.payload.data
      })
      .addCase(getReceiptById.fulfilled, (state, action) => {
        state.receipt = action.payload.data
      })
  }
})

const selectSelf = (state: RootState) => state.receipt

const receiptsSelector = createSelector(selectSelf, (state) => state.receipts)
const receiptsBySellerSelector = createSelector(selectSelf, (state) => state.receiptsBySeller)
const receiptsByBuyerSelector = createSelector(selectSelf, (state) => state.receiptsByBuyer)
const receiptSelector = createSelector(selectSelf, (state) => state.receipt)

export const receiptsSelectors = {
  receiptsSelector,
  receiptSelector,
  receiptsByBuyerSelector,
  receiptsBySellerSelector
}

export default receiptSlice.reducer
