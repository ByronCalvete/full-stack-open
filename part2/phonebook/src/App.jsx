import { useState } from 'react'

const App = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([
    { 
      name: 'Arto Hellas',
      id: 1
    }
  ])
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContactToAdd = {
      id: Math.random() * 10000, // This is an anti-pattern too, but is only for this exercise
      name: newPhoneNumber
    }

    setPhoneNumbers([...phoneNumbers, newContactToAdd])
    setNewPhoneNumber('')
  }

  const handleChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <input value={newPhoneNumber} onChange={handleChange}/>
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      {phoneNumbers.map(phoneNumber => <p key={phoneNumber.id}>{phoneNumber.name}</p>)}
    </>
  )
}
export default App
