/* eslint-disable no-undef */
import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filterReducer', () => {
  test.only('return a new state with the action filter/filterChange', () => {
    const state = ''
    const action = {
      type: 'filter/filterChange',
      payload: 'ola'
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)
    expect(newState).toBe('ola')
  })
})