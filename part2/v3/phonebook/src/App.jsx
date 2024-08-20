import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return null
    }

    setPersons([ ...persons, newPerson ])
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterName(e.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={filterName}
          onChange={handleFilterChange}
        />
      </div>
      <h3>add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
            required
          />
        </div>
        <button>add</button>
      </form>
      <h3>Numbers</h3>
      {persons
        .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
        .map(person => {
        return <p key={person.id}>{person.name} {person.number}</p>
      })}
    </>
  )
}

export default App
