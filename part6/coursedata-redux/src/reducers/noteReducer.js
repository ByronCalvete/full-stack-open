import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      return [ ...state, action.payload ]
    },
    toggleImportanceOf(state, action) {
      return action.payload
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer
