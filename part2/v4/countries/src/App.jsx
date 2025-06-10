import { useState, useEffect } from 'react'

import CountryDetail from './components/CountryDetail'
import CountryList from './components/CountryList'

const App = () => {
  const [ countries, setCountries ] = useState(null)
  const [ country, setCountry ] = useState('')

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(json => {
        setCountries(json)
      })
  }, [])

  const handleChange = (e) => {
    setCountry(e.target.value)
  }

  if (countries === null) {
    return null
  }

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()))

  return (
    <div>
      find countries
      <input
        value={country}
        onChange={handleChange}
      />
      {countriesToShow.length >= 10
        ? <p>Too many matches, specify another filter</p>
        : countriesToShow.length > 1
          ? <CountryList countries={countriesToShow} />
          : <CountryDetail country={countriesToShow[0]} />
      }
    </div>
  )
}

export default App
