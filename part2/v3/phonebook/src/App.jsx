import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
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

  return (
    <>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {persons.map(person => {
        return <p key={person.name}>{person.name} {person.number}</p>
      })}
    </>
  )
}

export default App
