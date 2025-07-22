import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const sliceNotification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification, hideNotification } = sliceNotification.actions

export const showNotification = (message, duration) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(hideNotification(''))
    }, duration)
  }
}

export default sliceNotification.reducer
