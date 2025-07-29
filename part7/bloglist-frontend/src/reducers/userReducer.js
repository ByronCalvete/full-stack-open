import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogged(state, action) {
      return action.payload
    }
  }
})

export const { userLogged } = userSlice.actions

export const setUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch(userLogged(user))
    } catch {
      dispatch(setNotification('Wrong username or password', 3000))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(userLogged(null))
  }
}

export const cacheUser = (user) => {
  return async dispatch => {
    dispatch(userLogged(user))
  }
}

export default userSlice.reducer
