import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [ value, setValue ] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [ country, setCountry ] = useState(null)

  useEffect(() => {
    if (name) {
      fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => response.json())
        .then(json => setCountry(json))
    }
  }, [name])

  return country
}
