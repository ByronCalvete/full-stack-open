import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [ inputValue, setInputValue ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ showDetailCountry, setShowDetailCountry ] = useState(false)

  useEffect(() => {
    if (inputValue) {
      fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
        .then(response => response.json())
        .then(json => {
          setCountries(json)
        })
    }
  }, [inputValue])

  const handleChange = (e) => {
    setInputValue(e.target.value)
    setShowDetailCountry(false)
  }

  const handleClick = (country) => {
    setShowDetailCountry(country)
    setCountries([])
    setInputValue('')
  }
  
  return (
    <div>
      find countries
      <input
        value={inputValue}
        onChange={handleChange}
      />
      {
        countries.length === 1
        ? <CountryDetail country={countries[0]} />
        : countries.length > 10
          ? <p>Too many matches, specify another filter</p>
          : <Countries countries={countries} handleClick={handleClick} />
      }
      { showDetailCountry && <CountryDetail country={showDetailCountry} />}
    </div>
  )
}

export default App
