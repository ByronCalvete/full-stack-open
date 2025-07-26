import { useState } from 'react'
import { useField, useCountry } from './hooks'

import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const [ name, setName ] = useState('')
  const country = useCountry(name)

  const onSubmit = (e) => { 
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>
      
      <Country country={country} />
    </>
  )
}

export default App
