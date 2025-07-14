import { test, expect, describe } from 'vitest'
import counterReducer from "./counterReducer";
import deepFreeze from 'deep-freeze';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    deepFreeze(state)
    const newState = counterReducer(undefined, action)

    expect(newState).toEqual(initialState)
  })

  test('good is increment', () => {
    const state = initialState
    const action = {
      type: 'GOOD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({ good: 1, ok: 0, bad: 0 })
  })

  test('ok not change the state', () => {
    const state = initialState
    const action = {
      type: 'OK'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({ good: 0, ok: 1, bad: 0 })
  })

  test('bad is decrement', () => {
    const state = initialState
    const action = {
      type: 'BAD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({ good: 0, ok: 0, bad: 1 })
  })

  test('zero reset the counter', () => {
    const state = { good: 2, ok: 3, bad: 4 }
    const action = {
      type: 'ZERO'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual(initialState)
  })
})
