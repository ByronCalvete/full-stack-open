import { useState, useEffect } from 'react'

import { getPersons, createPerson, deletePerson, updatePerson } from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      if (confirm(`${personToAdd.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personUpdated = { ...isPersonInPhonebook, number: personToAdd.number }
        updatePerson(personUpdated.id, personUpdated)
          .then(newPerson => {
            setPersons(persons.map(person => person.id !== personUpdated.id ? person : newPerson))
            setNewPerson('')
            setNewNumber('')
            setSuccessMessage(`Update the number of ${newPerson.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${isPersonInPhonebook.name} has already been removed from server`)
            setPersons(persons.filter(person => person.id !== isPersonInPhonebook.id))
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
      setNewPerson('')
      setNewNumber('')
      return null
    }
    createPerson(personToAdd)
      .then(personCreated => {
        setPersons([ ...persons, personCreated ])
        setNewPerson('')
        setNewNumber('')
        setSuccessMessage(`Added ${personCreated.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
        setNewPerson('')
        setNewNumber('')
        if (error.response.data.name) {
          setErrorMessage(error.response.data.name.message)
        } 
        if (error.response.data.number) {
          setErrorMessage(`Format error. The number format should be like '123-45667345' or '123-3456756'`)
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (confirm(`Do you want to delete ${personToDelete.name}?`)) {
      deletePerson(id)
      const personsWithoutDeletePerson = persons.filter(person => person.id !== id)
      setPersons(personsWithoutDeletePerson)
    }
  }

  const filteredPeople = persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))

  return(
    <>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
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
      <Persons
        filteredPeople={filteredPeople}
        handleDelete={handleDeletePerson}
      />
    </>
  )
}

export default App
