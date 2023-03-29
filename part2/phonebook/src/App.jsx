import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => (
        setPersons(response.data)
      ))
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

    setPersons([...persons, newPersonToAdd])
    setNewPerson('')
    setNewNumber('')
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
      <Persons persons={persons} filtered={filtered}/>
    </>
  )
}
export default App
