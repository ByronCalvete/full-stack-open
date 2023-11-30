import { useState, useEffect } from 'react'

import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (countryName) {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Something went wrong')
      })
      .then(json => setCountries(json))
      .catch(error => (
        setCountries([])
      ))
    }
    setCountries([])
  }, [countryName])

  const handleChange = (e) => {
    setCountryName(e.target.value)
  }

  return (
    <>
      <p>
        find countries <input value={countryName} onChange={handleChange}/>
      </p>
      {countries.length > 0 && <DisplayCountries countries={countries} />}
    </>
  )
}

export default App
9