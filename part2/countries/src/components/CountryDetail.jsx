import { useState, useEffect } from 'react'

const CountryDetail = ({ country }) => {
  console.log(country)
  const [weather, setWeather] = useState(null)
  const [weatherImage, setWeatherImage] = useState(null)

  const api_key = import.meta.env.VITE_MY_API_KEY

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
      .then(response => response.json())
      .then(data => setWeather(data))
  }, [])

  useEffect(() => {
    if(weather) {
      fetch(`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`)
      .then(response => response.url)
      .then(data => setWeatherImage(data))
    }
  })

  return (
    <>
      <h2>{country.name.common} {country.flag}</h2>
      <p><strong>Capital:</strong> {country?.capital[0]}</p>
      <p><strong>Area:</strong> {country.area} m²</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(language => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width='250' />
      <h3>Weather in {country?.capital[0]}</h3>
      <p>Temperature {(weather?.main?.temp - 273.5).toFixed(2)} Celcius</p>
      <img src={weatherImage} alt='Weather state' />
      <p>Wind {weather?.wind?.speed} m/s</p>
    </>
  )
}

export default CountryDetail
