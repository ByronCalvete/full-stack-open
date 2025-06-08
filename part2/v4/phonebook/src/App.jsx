import { useState } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPeople, setFilteredPeople ] = useState('') 

  const addPerson = (e) => {
    e.preventDefault()
    const alreadyExits = persons.some(person => person.name === newName)

    if (alreadyExits) {
      setNewName('')
      setNewNumber('')
      return alert(`${newName} is already added to phonebook`)
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons([ ...persons, nameObject ])
    setNewName('')
    setNewNumber('')
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleChangeFiltered = (e) => {
    setFilteredPeople(e.target.value)
  }

  const personFiltered = persons.filter(person => (
    person.name.toLocaleLowerCase().includes(filteredPeople.toLowerCase())
  ))

  return (
    <>
      <h2>Phonebook</h2>
      <SearchFilter
        filteredPeople={filteredPeople}
        handleChangeFiltered={handleChangeFiltered}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h3>Numbers</h3>
      <Persons personFiltered={personFiltered}/>
    </>
  )
}

export default App
