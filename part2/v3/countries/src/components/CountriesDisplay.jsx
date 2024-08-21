const CountriesDisplay = ({ countries, handleClick }) => {
  return (
    <>
      {countries.map(country => (
        <p key={country.area}>
          {country.name.common}
          <button onClick={() => handleClick(country)}>show</button>
        </p>
      ))}
    </>
  )
}

export default CountriesDisplay
