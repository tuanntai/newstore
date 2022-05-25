import { createSelector, createSlice } from '@reduxjs/toolkit'
import { notification } from 'antd'
import { IDelivery } from '../../../api/delivery/delivery'
import {
  createDelivery,
  getDeliveries,
  getDeliveryById,
  updateDeliveryById,
  updateDeliveryState
} from '../../actions/delivery/delivery'
import { RootState } from '../../store'

export interface IDeliveryState {
  deliveries: IDelivery[]
  delivery?: IDelivery
}

const initialState: IDeliveryState = {
  deliveries: []
}

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.delivery = action.payload.data
      })
      .addCase(getDeliveries.fulfilled, (state, action) => {
        state.deliveries = action.payload.data.sort((a, b) => a.state.localeCompare(b.state))
      })
      .addCase(getDeliveryById.fulfilled, (state, action) => {
        state.delivery = action.payload.data
      })
      .addCase(updateDeliveryById.fulfilled, (state, action) => {
        const delivery = state.deliveries.find((item) => item.id === action.payload.id)
        if (delivery !== undefined) {
          delivery.address = action.payload.address
          delivery.phone = action.payload.phone
        }
      })
      .addCase(updateDeliveryState.fulfilled, (state, action) => {
        const delivery = state.deliveries.find((item) => item.id === action.payload.data.id)
        if (delivery !== undefined) {
          delivery.state = action.payload.data.state
        }
        notification.success({
          message: `Change status successfully!`,
          placement: 'bottomRight'
        })
      })
      .addCase(updateDeliveryState.rejected, (state, action) => {
        notification.warning({
          message: action.payload as string,
          placement: 'bottomRight'
        })
      })
  }
})

const selectSelf = (state: RootState) => state.delivery

const deliveriesSelector = createSelector(selectSelf, (state) => state.deliveries)
const deliverySelector = createSelector(selectSelf, (state) => state.delivery)

export const deliveriesSelectors = { deliveriesSelector, deliverySelector }

export default deliverySlice.reducer
