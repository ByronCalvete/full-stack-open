const NoteForm = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <>
      <h2>New note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </>
  )
}

export default NoteForm
