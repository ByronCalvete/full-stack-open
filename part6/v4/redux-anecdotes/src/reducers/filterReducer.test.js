import { describe, test, expect } from 'vitest'
import filterReducer from './filterReducer'
import deepFreeze from 'deep-freeze'

describe('filter reducer', () => {
  test('return a new state with action filter/filterChange', () => {
    const state = 'Hi'

    const action = {
      type: 'filter/filterChange',
      payload: 'happy'
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)

    expect(newState).toEqual(action.payload)
  })
})
