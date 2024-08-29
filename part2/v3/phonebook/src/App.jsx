import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ notificationSuccessMessage, setNotificationSuccessMessage ] = useState(null)
  const [ notificationErrorMessage, setNotificationErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName.trim(),
      number: newNumber
    }

    const isPersonInThePhonebook = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (isPersonInThePhonebook) {
      if (confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personUpdated = { ...isPersonInThePhonebook, number: newPerson.number }

        personService
          .updatePerson(personUpdated.id, personUpdated)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personUpdated.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationSuccessMessage(`${returnedPerson.name} number is changed`)
            setTimeout(() => {
              setNotificationSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== personUpdated.id))
            setNotificationErrorMessage(`Information of ${personUpdated.name} has already been removed from server`)
            setTimeout(() => {
              setNotificationErrorMessage(null)
            }, 3000)
          })
      }
      setNewName('')
      setNewNumber('')
      return null
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons([ ...persons, returnedPerson ])
        setNewName('')
        setNewNumber('')
        setNotificationSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
        setNotificationErrorMessage(error.response.data.error)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setNotificationErrorMessage(null)
        }, 3000)
      })
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

  const handleDeletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id) // This promise does no return data
        setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={notificationSuccessMessage} type='success' />
      <Notification message={notificationErrorMessage} type='error' />
      <Filter
        filterName={filterName}
        handleChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterName={filterName}
        deletePerson={handleDeletePerson}
      />
    </>
  )
}

export default App
