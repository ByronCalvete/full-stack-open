import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newPerson, setNewPerson] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    setPersons([ ...persons, { name: newPerson } ])
    setNewPerson('')
  }

  const handleNewPerson = (e) => {
    setNewPerson(e.target.value)
  }

  return(
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handleNewPerson} />
        </div>
        <button>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </>
  )
}

export default App
