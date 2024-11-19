import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return [ ...state, action.payload ]
    },
    votedAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id === newAnecdote.id ? newAnecdote : anecdote
      )
    }
  }
})

export const { setAnecdotes, appendAnecdote, votedAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes)) 
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id, anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(id, anecdote)
    dispatch(votedAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
