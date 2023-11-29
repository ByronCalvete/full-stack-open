import { useState, useEffect } from 'react'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(json => setCountries(json))
  }, [])

  const handleChange = (e) => {
    console.log(e.target.value)
    setCountry(e.target.value)
  }

  console.log(countries)

  return (
    <p>
      find countries <input value={country} onChange={handleChange}/>
    </p>
  )
}

export default App

