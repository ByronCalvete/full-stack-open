import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>name:</td>
              <td>
                <input
                  value={newPerson}
                  onChange={handleChangeName}
                  placeholder='Byron Calvete'
                />
              </td>
            </tr>
            <tr>
              <td>number:</td>
              <td>
                <input
                  type='number'
                  value={newNumber}
                  onChange={handleChangeNumber}
                  placeholder='1234567890'
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.number}>{person.name} {person.number.slice(0,3)}-{person.number.slice(4)}</p>)}
    </>
  )
}
export default App
