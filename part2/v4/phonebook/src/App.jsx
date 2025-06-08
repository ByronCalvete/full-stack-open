import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPeople, setFilteredPeople ] = useState('') 

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
      number: newNumber,
      id: persons.length + 1
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

  const handleChangeFiltered = (e) => {
    setFilteredPeople(e.target.value)
  }

  const personFiltered = persons.filter(person => (
    person.name.toLocaleLowerCase().includes(filteredPeople.toLowerCase())
  ))

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filteredPeople} onChange={handleChangeFiltered}/>
      </div>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleChangeName}/></div>
        <div>number: <input value={newNumber} onChange={handleChangeNumber} /></div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <div>
        <h3>Numbers</h3>
        {personFiltered.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
      </div>
    </>
  )
}

export default App
