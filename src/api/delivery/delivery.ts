import { IDataError } from '../../utils/apiErrorService'
import { getApi, postApi } from '../../utils/apiHelper'
import { DELIVERY_API_URL } from '../apiUrls'

export enum DeliveryState {
  None = 'None',
  Waiting = 'Waiting',
  Shipping = 'Shipping',
  Done = 'Done'
}

export interface ICreateDelivery {
  bookId: string
  buyerId: string
}

export interface IDelivery {
  address: string
  phone: string
  state: DeliveryState
  bookId: string
  deletedAt: string | null
  id: string
  createdAt: string
  updatedAt: string
}

export interface IDeliveryResponse {
  data: IDelivery
}

export interface IDeliveriesResponse {
  data: IDelivery[]
}

export interface IUpdateDeliveryState {
  id: string
  state: DeliveryState
}

export interface IUpdateDelivery {
  address: string
  phone: string
  state: DeliveryState
}

export const createDeliveryApi = async (payload: ICreateDelivery) =>
  await postApi<ICreateDelivery, IDeliveryResponse | IDataError>(DELIVERY_API_URL.delivery, payload)

export const getDeliveriesApi = async () =>
  await getApi<IDeliveriesResponse>(DELIVERY_API_URL.delivery)

export const getDeliveryByIdApi = async (id: string) =>
  await getApi<IDeliveryResponse>(DELIVERY_API_URL.deliveryById(id))

export const updateDeliveryStateApi = async (payload: IUpdateDeliveryState) =>
  await postApi<IUpdateDeliveryState, IDeliveryResponse | IDataError>(
    DELIVERY_API_URL.updateDelivery,
    payload
  )

export const updateDeliveryApi = async (id: string, payload: IUpdateDelivery) =>
  await postApi<IUpdateDelivery, any | IDataError>(DELIVERY_API_URL.deliveryById(id), payload)
