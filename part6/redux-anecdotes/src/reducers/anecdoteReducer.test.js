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
  test('return a new state with action anecdotes/addVote', () => {
    const state = initialState
    const action = {
      type: 'anecdotes/addVote',
      payload: 1
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

  test('return new state with action anecdotes/createAnecdote', () => {
    const state = initialState
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'Anecdote 3'
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
  })
})
