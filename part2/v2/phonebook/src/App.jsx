import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const personToAdd = {
      name: newPerson.trim(),
      number: newNumber
    }
    const isPersonInPhonebook = persons.find(person => person.name === personToAdd.name)
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

  const handleFilterPerson = (e) => {
    setFilterPerson(e.target.value)
  }

  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))

  return(
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={filterPerson}
          onChange={handleFilterPerson}
        />
      </div>
      <h2>add a new</h2>
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
      {filteredPeople.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

export default App
