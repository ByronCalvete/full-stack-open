import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const sliceNotification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return action.payload
    }
  }
})

export const { showNotification, hideNotification } = sliceNotification.actions 
export default sliceNotification.reducer
