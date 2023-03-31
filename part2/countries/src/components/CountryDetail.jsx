const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name.common} {country.flag}</h2>
      <p><strong>Capital:</strong> {country.capital[0]}</p>
      <p><strong>Area:</strong> {country.area} m²</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(language => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width='250' />
    </>
  )
}

export default CountryDetail
