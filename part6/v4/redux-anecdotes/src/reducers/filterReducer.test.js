import { describe, test, expect } from 'vitest'
import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filter reducer', () => {
  test('return a new state with action SET_FILTER', () => {
    const state = 'Hi'

    const action = {
      type: 'SET_FILTER',
      payload: 'note'
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)

    expect(newState).toEqual(action.payload)
  })
})
