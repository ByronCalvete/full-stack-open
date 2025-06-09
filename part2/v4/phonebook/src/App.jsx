import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SearchFilter from './components/SearchFilter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPeople, setFilteredPeople ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const alreadyExist = persons.find(person => person.name === newName)

    if (alreadyExist) {
      if (!confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        setNewName('')
        setNewNumber('')
        return null
      }

      const changedPerson = { ...alreadyExist, number: newNumber }

      personService
        .update(alreadyExist.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name === alreadyExist.name ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`The number of ${returnedPerson.name} was changed`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${alreadyExist.name} has already been removed from the server`)
          setNewName('')
          setNewNumber('')
          setPersons(persons.filter(person => person.name !== alreadyExist.name))
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })

      return null
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons([ ...persons, returnedPerson ])
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const deletePerson = (person) => {
    const id = person.id
  
    if (!confirm(`Delete ${person.name} ?`)) return null

    personService
      .deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== id))
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
      {successMessage && <Notification message={successMessage} styleType='success' />}
      {errorMessage && <Notification message={errorMessage} styleType='error' />}
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
      <Persons
        personFiltered={personFiltered}
        deletePerson={deletePerson}
      />
    </>
  )
}

export default App
