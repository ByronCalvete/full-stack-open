import { useState } from 'react'

import DetailCountry from "./DetailCountry"

const DisplayCountries = ({ countries }) => {
  const [showDetailCountry, setShowDetailCountry] = useState(false)

  const handleClick = (country) => {
    setShowDetailCountry(country)
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
          : <DetailCountry country={countries[0]} />
      }
      <hr />
      {showDetailCountry && <DetailCountry country={showDetailCountry} />}
    </>
  )
}

export default DisplayCountries
