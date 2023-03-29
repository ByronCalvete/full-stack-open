import { useState, useEffect } from 'react'

import { getAllPerson, createPerson, deletePerson } from './services/person'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    getAllPerson()
      .then(allPersons => setPersons(allPersons))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPersonToAdd = {
      name: newPerson.trim(),
      number: newNumber
    }

    const findPersonInContacts = persons.some(person => person.name === newPersonToAdd.name)
    if (findPersonInContacts) {
      alert(`${newPersonToAdd.name} is already added to phonebook`)
      setNewPerson('')
      setNewNumber('')
      return
    }

    createPerson(newPersonToAdd)
      .then(createdPerson => {
        setPersons([...persons, createdPerson])
        setNewPerson('')
        setNewNumber('')
      })
  }

  const handleChangeName = (e) => {
    setNewPerson(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleChangeFilter = (e) => {
    setFiltered(e.target.value)
  }

  const handleClickDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    confirm(`Delete ${personToDelete.name}?`)
    deletePerson(id)
    const personsWithoutDelete = persons.filter(person => person.id !== personToDelete.id)
    setPersons(personsWithoutDelete)
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter
        handleChangeFilter={handleChangeFilter}
        filtered={filtered}
      />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newPerson={newPerson}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filtered={filtered}
        handleClickDelete={handleClickDelete}
      />
    </>
  )
}
export default App
