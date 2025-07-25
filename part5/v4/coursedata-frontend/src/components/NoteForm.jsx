import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [ newNote, setNewNote ] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() < 0.5
    })

    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input
          data-testid='newNote'
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          placeholder='write a note content here'
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
