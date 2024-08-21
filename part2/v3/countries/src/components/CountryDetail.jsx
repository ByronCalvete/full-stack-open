import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_WHEATHER_API_KEY

const CountryDetail = ({ country }) => {
  const { name, capital, area, languages, flags, capitalInfo: { latlng } } = country || {}

  const [ weather, setWeather ] = useState({})
  const [ imageWeather, setImageWeather ] = useState(null)

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(json => {
        setWeather(json)
      })
  }, [latlng])

  useEffect(() => {
    if (weather.weather) {
      fetch(`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`)
        .then(response => response.url)
        .then(url => setImageWeather(url))
    }
  }, [weather])

  return (
    <>
      <h2>{name.common}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h4>Languages:</h4>
      <ul>
        {Object.values(languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img
        src={flags.svg}
        alt={`${name.common} flag`}
        width='200'
      />
      <h3>Weather in {capital}</h3>
      <p>temperature {(weather?.main?.temp - 273.15).toFixed(2)} Celsius</p>
      <img src={imageWeather} alt={`Weather in ${capital} image`} />
      <p>wind {weather?.wind?.speed} m/s</p>
    </>
  )
}

export default CountryDetail
