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
    <div className='formDiv'>
      <h3>Create a new note</h3>
      <form onSubmit={addNote}>
        <input
          data-testid='newNote'
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          placeholder='write note content here'
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
