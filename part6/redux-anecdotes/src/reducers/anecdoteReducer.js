import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      const newAnecdote = {
        content,
        id: getId(),
        votes: 0
      }
      return [ ...state, newAnecdote ]
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id) 
      const anecdoteWithVote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id === id ? anecdoteWithVote : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
