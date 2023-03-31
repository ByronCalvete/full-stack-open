import { useEffect, useState } from 'react'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')

  useEffect(() => {
    if (countryName) {
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error ('Something went wrong')
      })
      .then(data => (setCountries(data)))
      .catch(error => (
        setCountries([])
      ))
    }
    setCountries([])
  }, [countryName])

  const handleChange = (e) => {
    setCountryName(e.target.value)
    // fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json()
    //     }
    //     throw new Error ('Something went wrong')
    //   })
    //   .then(data => (setCountries(data)))
    //   .catch(error => (
    //     setCountries([])
    //   ))
  }

  return (
    <>
      <h1>Countries</h1>
      <p>find countries <input value={countryName} onChange={handleChange}/></p>
      {countries.length > 0 && <DisplayCountries countries={countries} />}
    </>
  )
}

export default App
