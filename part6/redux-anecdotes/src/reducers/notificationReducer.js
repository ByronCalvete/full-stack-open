import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notification(state, action) {
      return action.payload
    }
  }
})

export const { notification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(notification(message))
    setTimeout(() => {
      dispatch(notification(null))
    }, time*1000)
  }
}

export default notificationSlice.reducer
