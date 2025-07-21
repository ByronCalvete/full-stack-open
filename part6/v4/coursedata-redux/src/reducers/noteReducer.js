import { createSlice } from "@reduxjs/toolkit"

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2
//   }
// ]

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      return [ ...state, action.payload ]
    },
    toggleImportanceOf(state, action) {
      // console.log(current(state))
      const changedNote = action.payload
      return state.map(note => note.id === changedNote.id ? changedNote :  note)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const { createNote, toggleImportanceOf, setNotes } = noteSlice.actions
export default noteSlice.reducer
