import { useState } from 'react'

import CountryDetail from './CountryDetail'

const CountryList = ({ countries }) => {
  const [ listCountries, setListCountries ] = useState(countries)

  const handleClick = (country) => {
    console.log(country)
    setListCountries(country)
  }

  return(
    <div>
      {listCountries.length > 1
        ? countries.map(country => (
            <p key={country.name.official}>
              {country.name.common}
              <button onClick={() => handleClick(country)}>show</button>
            </p>
          ))
        : <CountryDetail country={listCountries} />
      }
    </div>
  )
}

export default CountryList
