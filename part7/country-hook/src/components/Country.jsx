const Country = ({ country }) => {
  const { name, capital, population, flags  } = country || {}

  if (!country) return null

  const style = {
    padding: 10
  }

  if (!country.name) {
    return (
      <div style={style}>
        not found...
      </div>
    )
  }


  return (
    <div style={style}>
      <h3>{name.common}</h3>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <img src={flags.svg} height='100' alt={`flag of ${name.common}`}/>
    </div>
  )
}

export default Country
