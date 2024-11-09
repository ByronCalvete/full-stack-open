/* eslint-disable no-undef */
import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  const initialState = [
    {
      content: 'Anecdote 1',
      id: 1,
      votes: 0
    },
    {
      content: 'Anecdote 2',
      id: 2,
      votes: 0
    }
  ]
  test('return a new state with action ANECDOTE_VOTE', () => {
    const state = initialState
    const action = {
      type: 'ANECDOTE_VOTE',
      payload: { id: 1 }
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toEqual([
      {
        content: 'Anecdote 1',
        id: 1,
        votes: 1
      },
      {
        content: 'Anecdote 2',
        id: 2,
        votes: 0
      }
    ])
  })

  test('return new state with action NEW_ANECDOTE', () => {
    const state = initialState
    const action = {
      type: 'NEW_ANECDOTE',
      payload: {
        content: 'Anecdote 3',
        id: 3,
        votes: 0
      }
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual(action.payload)
  })
})
