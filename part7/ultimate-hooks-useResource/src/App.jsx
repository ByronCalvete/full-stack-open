import { useField, useResource } from './hooks/index'

const App = () => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetName, ...name } = useField('text')
  const { reset: resetNumber, ...number } = useField('text')

  const [ notes, noteService ] = useResource('http://localhost:3005/notes')
  const [ persons, personService ] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (e) => {
    e.preventDefault()
    noteService.create({ content: content.value })
    resetContent()

  }

  const handlePersonSubmit = (e) => {
    e.preventDefault()
    personService.create({ name: name.value, number: number.value })
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(note => <p key={note.id}>{note.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name  <input {...name} /><br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
