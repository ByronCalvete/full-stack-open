const NoteForm = ({ handleSubmit, newNote, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input
      value={newNote}
      onChange={handleChange}
    />
    <button type='submit'>save</button>
  </form>
)

export default NoteForm
