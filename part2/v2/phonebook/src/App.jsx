import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const personToAdd = {
      name: newPerson.trim(),
      number: newNumber
    }
    const isPersonInPhonebook = persons.some(person => person.name === personToAdd.name)
    if (isPersonInPhonebook) {
      alert(`${personToAdd.name} is already added to phonebook`)
      setNewPerson('')
      setNewNumber('')
      return
    }
    setPersons([ ...persons, personToAdd ])
    setNewPerson('')
    setNewNumber('')
  }

  const handleNewPerson = (e) => {
    setNewPerson(e.target.value)
  }
  
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  return(
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newPerson}
            onChange={handleNewPerson}
            required
          />
        </div>
        <div>
          number:
          <input
            type="number"
            value={newNumber}
            onChange={handleNewNumber}
            required
          />
        </div>
        <button>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

export default App
