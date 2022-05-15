import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getReceiptByIdApi,
  getReceiptsApi,
  getReceiptsByBuyerApi,
  getReceiptsBySellerApi,
  IReceiptResponse,
  IReceiptsResponse
} from '../../../api/receipt/receipt'

export const getReceipts = createAsyncThunk<IReceiptsResponse>('receipt/getAll', async (_) => {
  const response = await getReceiptsApi()
  return response
})

export const getReceiptsBySeller = createAsyncThunk<IReceiptsResponse, string>(
  'receipt/bySeller',
  async (id: string) => {
    const response = await getReceiptsBySellerApi(id)
    return response
  }
)

export const getReceiptsByBuyer = createAsyncThunk<IReceiptsResponse, string>(
  'receipt/byBuyer',
  async (id: string) => {
    const response = await getReceiptsByBuyerApi(id)
    return response
  }
)

export const getReceiptById = createAsyncThunk<IReceiptResponse, string>(
  'receipt/byId',
  async (id: string) => {
    const response = await getReceiptByIdApi(id)
    return response
  }
)
