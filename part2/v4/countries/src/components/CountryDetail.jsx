const CountryDetail = ({ country }) => {
  const { languages, name, capital, area, flags } = country 
  const countryLanguages = Object.values(languages)

  return (
    <>
      <h2>{name.common}</h2>
      <div>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {countryLanguages.map(language => <li key={language}>{language}</li>)}
        </ul>
      </div>
      <img src={flags.svg} width='200' alt={`Flag of ${name.common}`}/>
    </>
  )
}

export default CountryDetail
