import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"
import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? ' important': ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }

    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  const toggleImportance = async (id) => {
    const noteToChange = notes.find(note => note.id === id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    }
    const newNote = await noteService.updateNote(id, changedNote)
    dispatch(toggleImportanceOf(newNote))
  }

  return (
    <ul>
      {notes.map(note => 
        <Note
          key={note.id}
          note={note}
          handleClick={() => toggleImportance(note.id)}
        />
      )}
    </ul>
  )
}

export default Notes
