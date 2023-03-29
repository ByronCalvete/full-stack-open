import { useState, useEffect }  from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const noteToAdd = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() > 0.5
    }

    setNotes([...notes, noteToAdd])
    setNewNote('')
  }

  const handleChange = (e) => {
    setNewNote(e.target.value)
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
          <Note key={note.id} note={note} />
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
