import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '34-123456789' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const alreadyExits = persons.some(person => person.name === newName)

    if (alreadyExits) {
      setNewName('')
      setNewNumber('')
      return alert(`${newName} is already added to phonebook`)
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }

    setPersons([ ...persons, nameObject ])
    setNewName('')
    setNewNumber('')
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleChangeName}/></div>
        <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <div>
        <h3>Numbers</h3>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </>
  )
}

export default App
