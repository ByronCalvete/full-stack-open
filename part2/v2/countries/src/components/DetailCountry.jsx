const DetailCountry = ({ country }) => {
  const { name, capital, area, flags, languages } = country

  return (
    <>
      <h2>{name.common}</h2>
      <p>Capital {capital}</p>
      <p>area {area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={flags.svg} alt={name.common} width="300"/>
    </>
  )
}

export default DetailCountry
