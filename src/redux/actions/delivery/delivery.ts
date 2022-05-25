import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createDeliveryApi,
  getDeliveriesApi,
  getDeliveryByIdApi,
  ICreateDelivery,
  IDeliveriesResponse,
  IDeliveryResponse,
  IUpdateDelivery,
  IUpdateDeliveryState,
  updateDeliveryApi,
  updateDeliveryStateApi
} from '../../../api/delivery/delivery'
import { instanceOfDataError } from '../../../utils/apiErrorService'

export const createDelivery = createAsyncThunk<IDeliveryResponse, ICreateDelivery>(
  'delivery/create',
  async (payload: ICreateDelivery, { rejectWithValue }) => {
    const response = await createDeliveryApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getDeliveries = createAsyncThunk<IDeliveriesResponse>(
  'delivery/getAll',
  async (_, { rejectWithValue }) => {
    const response = await getDeliveriesApi()
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const getDeliveryById = createAsyncThunk<IDeliveryResponse, string>(
  'delivery/getById',
  async (id: string, { rejectWithValue }) => {
    const response = await getDeliveryByIdApi(id)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return response
  }
)

export const updateDeliveryById = createAsyncThunk<any, any>(
  'delivery/update',
  async ({ id, payload }: { id: string; payload: IUpdateDelivery }, { rejectWithValue }) => {
    const response = await updateDeliveryApi(id, payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    return { ...response, phone: payload.phone, address: payload.address, id }
  }
)

export const updateDeliveryState = createAsyncThunk<IDeliveryResponse, IUpdateDeliveryState>(
  'delivery/updateDelivery',
  async (payload: IUpdateDeliveryState, { rejectWithValue, dispatch }) => {
    const response = await updateDeliveryStateApi(payload)
    if (instanceOfDataError(response)) {
      return rejectWithValue(response.error)
    }
    dispatch(getDeliveries())
    return response
  }
)
