import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPeople, setFilteredPeople ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons([ ...persons, returnedPerson ])
        setNewName('')
        setNewNumber('')
      })
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
