import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    makeNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return action.payload
    }
  }
})

export const { makeNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
