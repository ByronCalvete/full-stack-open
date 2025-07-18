import { test, expect, describe } from 'vitest'
import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdotes reducer', () => {
  test('return new state with action anecdotes/addVote', () => {
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
      type: 'anecdotes/addVote',
      payload: 2
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

  test('return new state with action anecdotes/addAnecdote', () => {
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
      type: 'anecdotes/addAnecdote',
      payload: 'The third anecdote for test'
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(3)
    expect(newState.map(anecdote => anecdote.content)).toContainEqual(action.payload)
  })
})
