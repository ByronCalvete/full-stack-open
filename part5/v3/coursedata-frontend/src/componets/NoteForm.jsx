import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [ newNote, setNewNote ] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  return (
    <>
      <h3>Create a new note</h3>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type='submit'>save</button>
      </form>
    </>
  )
}

export default NoteForm
