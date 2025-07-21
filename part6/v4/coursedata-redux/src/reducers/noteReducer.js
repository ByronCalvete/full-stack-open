import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      // console.log(current(state))
      const changedNote = action.payload
      return state.map(note => note.id === changedNote.id ? changedNote :  note)
    },
    appendNote(state, action) {
      return [ ...state, action.payload ]
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { toggleImportanceOf, setNotes, appendNote } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNote(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer
