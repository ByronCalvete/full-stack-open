import { useState } from 'react'

const people = [
  { name: 'Arto Hellas', number: '0401234567' },
  { name: 'Byron Calvete', number: '1234567890' },
  { name: 'Lebron James', number: '3213124235' },
  { name: 'Luka Doncic', number: '3247457865' },
  { name: 'Ja Morat', number: '2439458677' },
  { name: 'Chirs Paul', number: '9320983467'},
  { name: 'Diana Taurasi', number: '2389823756'},
  { name: 'Ada Lovelace', number: '3944532352' },
  { name: 'Dan Abramov', number: '1243234345' },
  { name: 'Mary Poppendieck', number: '3923423122' }
]

const App = () => {
  const [persons, setPersons] = useState(people)
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

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
      <h2>Add a new</h2>
      <div>filter shown with <input value={filtered} onChange={handleChangeFilter}/></div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>name:</td>
              <td>
                <input
                  value={newPerson}
                  onChange={handleChangeName}
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
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase())).map((person) => <p key={person.number}>{person.name} {person.number.slice(0,3)}-{person.number.slice(3)}</p>)}
    </>
  )
}
export default App
