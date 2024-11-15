import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'important' : ''}</strong>
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

  const toggleNote = async (id) => {
    const noteToChange = notes.find(note => note.id === id)
    const noteChanged = {
      ...noteToChange,
      important: !noteToChange.important
    }
    const noteUpdated = await noteService.toggleImportance(id, noteChanged)
    const newNotes = notes.map(note => note.id === id ? noteUpdated : note)
    dispatch(toggleImportanceOf(newNotes))
  }

  return (
    <ul>
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => toggleNote(note.id)}
        />
      ))}
    </ul>
  )
}

export default Notes
