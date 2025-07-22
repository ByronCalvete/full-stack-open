import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
    },
    addAnecdote(state, action) {
      return [ ...state, action.payload ]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateVote = (newAnecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(newAnecdote.id, newAnecdote)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
