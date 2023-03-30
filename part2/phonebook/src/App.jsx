import { useState, useEffect } from 'react'

import { getAllPerson, createPerson, deletePerson, updatePerson } from './services/person'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [isCreated, setIsCreated] = useState(false)
  const [updated, setUpdated] = useState('')
  const [isError, setIsError] = useState(false)

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

    const findPersonInContacts = persons.find(person => person.name === newPersonToAdd.name)
    if (findPersonInContacts !== undefined) {
      if (confirm(`${findPersonInContacts.name} is already added to phonebook, replace the old number with a new one?`)) {
        const editedPersonPhone = { ...findPersonInContacts, number: newPersonToAdd.number }
        updatePerson(findPersonInContacts.id, editedPersonPhone)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === findPersonInContacts.id ? updatedPerson : person))
            setNewPerson('')
            setNewNumber('')
            setUpdated(updatedPerson.name)
            setTimeout(() => {
              setUpdated('')
            }, 2000)
            return null
          })
          .catch(error => {
            setIsError(findPersonInContacts.name)
            setTimeout(() => {
              setIsError(false)
            }, 2000)
          })
      }
      setNewPerson('')
      setNewNumber('')
      return null
    }

    createPerson(newPersonToAdd)
      .then(createdPerson => {
        setPersons([...persons, createdPerson])
        setNewPerson('')
        setNewNumber('')
        setIsCreated(true)
        setTimeout(() => {
          setIsCreated(false)
        }, 2000)
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
    if (confirm(`Delete ${personToDelete.name}?`)) {
      deletePerson(id)
      const personsWithoutDelete = persons.filter(person => person.id !== personToDelete.id)
      setPersons(personsWithoutDelete)
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      {isCreated && <Notification person={persons.at(-1).name} type='Added'/>}
      {updated && <Notification person={updated} type='Updated'/>}
      {isError && <Notification person={isError} type='has already been removed from server'/>}
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
