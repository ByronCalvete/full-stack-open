/* eslint-disable no-undef */
import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('return a new state with the action notification/mekeNotification', () => {
    const state = null
    const action = {
      type: 'notification/makeNotification',
      payload: 'Hola amigos'
    }

    const newState = notificationReducer(state, action)
    expect(newState).toBe('Hola amigos')
  })

  test('return a new state with the action notification/removeNotification', () => {
    const state = "Hi, I'm a notification"
    const action = {
      type: 'notification/removeNotification',
      payload: null
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toBeNull()
  })
})