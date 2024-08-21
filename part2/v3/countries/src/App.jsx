import { useState, useEffect } from 'react'

import CountryDetail from './components/CountryDetail'

const App = () => {
  const [ inputValue, setInputValue ] = useState('')
  const [ countries, setCountries ] = useState([])

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
        : countries.length < 10 && countries.map(country => <p key={country.name.official}>{country.name.common}</p>)
      }
    </div>
  )
}

export default App
