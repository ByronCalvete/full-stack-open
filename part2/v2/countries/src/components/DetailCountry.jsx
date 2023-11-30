import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_WHEATHER_API_KEY

const DetailCountry = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [imgWeather, setImgWeather] = useState(null)

  const { name, capital, area, flags, languages, latlng } = country

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(json => setWeather(json))
  }, [])

  useEffect(() => {
    if (weather) {
      fetch(`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`)
        .then(response => response.url)
        .then(url => setImgWeather(url))
      }
  })

  return (
    <>
      <h1>{name.common}</h1>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={flags.svg} alt={name.common} width="200"/>
      <hr />
      <h2>Weather in {capital}</h2>
      <p>Temperature {(weather?.main.temp - 273).toFixed(2)} Celcius</p>
      <img src={imgWeather} alt='Weather state' />
      <p>Wind {weather?.wind.speed} m/s</p>
    </>
  )
}

export default DetailCountry
