import { getApi } from '../../utils/apiHelper'
import { RECEIPT_API_URL } from '../apiUrls'
import { IUserInfo } from '../user/interface'

export interface IReceipt {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  seller: IUserInfo
  buyer: IUserInfo
  bookId: string
  price: number
}

export interface IReceiptsResponse {
  data: IReceipt[]
}
export interface IReceiptResponse {
  data: IReceipt
}

export const getReceiptsApi = async () => await getApi<IReceiptsResponse>(RECEIPT_API_URL.receipt)
export const getReceiptsBySellerApi = async (id: string) =>
  await getApi<IReceiptsResponse>(RECEIPT_API_URL.findBySeller(id))

export const getReceiptsByBuyerApi = async (id: string) =>
  await getApi<IReceiptsResponse>(RECEIPT_API_URL.findByBuyer(id))

export const getReceiptByIdApi = async (id: string) =>
  await getApi<IReceiptResponse>(RECEIPT_API_URL.receiptById(id))
