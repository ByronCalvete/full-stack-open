import { useState, useEffect }  from 'react'

import Note from './components/Note'
import { getAll, create, update } from './services/notes.js'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    getAll()
      .then(initialNotes => (
        setNotes(initialNotes)
      ))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const noteToAdd = {
      content: newNote,
      important: Math.random() > 0.5
    }

    create(noteToAdd)
      .then(returnedNote => {
        setNotes([...notes, returnedNote])
        setNewNote('')
      }) 
  }

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const toggleImportance = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important}

    update(id, changedNote)
      .then(updateNote => (
        setNotes(notes.map(note => note.id !== id ? note : updateNote))
      ))
      .catch(error => {
        alert(`The note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <div onClick={() => setShowAll(!showAll)}>
        <button>show {showAll ? 'important': 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.content}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange}/>
        <button type='submit'>save</button>
      </form>
    </>
  )
}

export default App
