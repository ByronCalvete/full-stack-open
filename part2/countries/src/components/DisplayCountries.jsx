import { useState } from 'react'
import CountryDetail from "./CountryDetail"

const DisplayCountries = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(null)

  const handleClick = (country) => {
    setShowCountry(country)
  }

  return (
    <>
      {
        countries.length > 10
        ? 'Too many matches, specify another filter'
        : countries.length > 1
          ? (countries.map(country => (
             <p key={country.name.common}>{country.name.common} <button onClick={() => handleClick(country)}>show</button></p>
          )))
          : <CountryDetail country={countries[0]}/>
      }
      {
        showCountry && <CountryDetail country={showCountry} />
      }
    </>
  )
}

export default DisplayCountries
