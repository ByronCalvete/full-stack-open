import { test, expect, describe } from 'vitest'
import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdotes reducer', () => {
  test('return new state with action NEW_VOTE', () => {
    const state = [
      {
        content: 'The first anecdote for test',
        id: 1,
        votes: 3
      },
      {
        content: 'The second anecdote for test',
        id: 2,
        votes: 1
      }
    ]
    const action = {
      type: 'NEW_VOTE',
      payload: { id: 2 }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'The second anecdote for test',
      id: 2,
      votes: 2
    })
  })

  test('return new state with action NEW_ANECDOTE', () => {
    const state = [
      {
        content: 'The first anecdote for test',
        id: 1,
        votes: 3
      },
      {
        content: 'The second anecdote for test',
        id: 2,
        votes: 1
      }
    ]
    const action = {
      type: 'NEW_ANECDOTE',
      payload: {
        content: 'The third anecdote for test',
        id: 3,
        votes: 5
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual(state[1])
    expect(newState).toContainEqual({
      content: 'The third anecdote for test',
      id: 3,
      votes: 5
    })
  })
})
