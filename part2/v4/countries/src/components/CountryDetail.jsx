import { useState, useEffect } from 'react'

const CountryDetail = ({ country }) => {
  const [ weather, setWeather ] = useState(null)

  const { languages, name, capital, area, flags, latlng } = country 
  const countryLanguages = Object.values(languages)

  const api_key = import.meta.env.VITE_KEY

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&&appid=${api_key}`)
      .then(response => response.json())
      .then(json => {
        setWeather(json)
      })
  }, [])

  if(weather === null) {
    return ''
  }

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
      <div>
        <h3>Weather in {name.common}</h3>
        <p>Temperature {(weather.main?.temp - 273.15).toFixed(2)} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind?.speed} m/s</p>
      </div>
    </>
  )
}

export default CountryDetail
