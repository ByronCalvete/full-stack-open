import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Some text here'

const sliceNotification = createSlice({
  name: 'notification',
  initialState
})

export default sliceNotification.reducer
