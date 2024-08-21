const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        width='200'
      />
    </>
  )
}

export default CountryDetail
