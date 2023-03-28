import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newPerson, setNewPerson] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPersonToAdd = {
      name: newPerson.trim()
    }

    const findPersonInContacts = persons.some(person => person.name === newPersonToAdd.name)
    if (findPersonInContacts) {
      alert(`${newPersonToAdd.name} is already added to phonebook`)
      setNewPerson('')
      return
    }

    setPersons([...persons, newPersonToAdd])
    setNewPerson('')
  }

  const handleChange = (e) => {
    setNewPerson(e.target.value)
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <input value={newPerson} onChange={handleChange}/>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((phoneNumber, i) => <p key={i}>{phoneNumber.name}</p>)}
    </>
  )
}
export default App
