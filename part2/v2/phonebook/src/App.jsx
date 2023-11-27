import { useState, useEffect } from 'react'

import { getPersons, createPerson } from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  useEffect(() => {
    getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personToAdd = {
      name: newPerson.trim(),
      number: newNumber
    }
    const isPersonInPhonebook = persons.find(person => person.name.toLowerCase() === personToAdd.name.toLowerCase())
    if (isPersonInPhonebook) {
      alert(`${personToAdd.name} is already added to phonebook`)
      setNewPerson('')
      setNewNumber('')
      return
    }
    createPerson(personToAdd)
      .then(personCreated => {
        setPersons([ ...persons, personCreated ])
        setNewPerson('')
        setNewNumber('')
      })
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
      <Filter
        filterPerson={filterPerson}
        handleFilterPerson={handleFilterPerson}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleNewPerson={handleNewPerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPeople={filteredPeople}/>
    </>
  )
}

export default App
