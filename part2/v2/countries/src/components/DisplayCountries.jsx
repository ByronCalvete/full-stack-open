import DetailCountry from "./DetailCountry"

const DisplayCountries = ({ countries }) => {
  return (
    <>
      {
        countries.length > 10
        ? 'Too many matches, specify another filter'
        : countries.length > 1
          ? (countries.map(country => (
              <p key={country.name.common}>{country.name.common}</p>
            )))
          : <DetailCountry country={countries[0]} />
    }
    </>
  )
}

export default DisplayCountries
