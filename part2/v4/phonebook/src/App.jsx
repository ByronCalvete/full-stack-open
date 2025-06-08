import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName
    }

    setPersons([ ...persons, nameObject ])
    setNewName('')
  }

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <div>
        <h3>Numbers</h3>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </>
  )
}

export default App
