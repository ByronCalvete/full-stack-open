/* eslint-disable no-undef */
import filterReducer from "./filterReducer";
import deepFreeze from "deep-freeze";

describe('filterReducer', () => {
  test('returns new state with action SET_FILTER', () => {
    const state = 'ALL'
    const action = {
      type: 'SET_FILTER',
      payload: 'WHATEVER'
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)
    expect(newState).toBe('WHATEVER')
  })
})
