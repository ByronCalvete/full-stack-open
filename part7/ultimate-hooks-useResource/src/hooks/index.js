import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [ value, setValue ] = useState('')

  const onChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [ resources, setResources ] = useState([])

  useEffect(() => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(json => setResources(json))
  }, [])

  const create = (resource) => {
    return fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resource)
    })
      .then(response => response.json())
      .then(json => setResources([ ...resources, json ]))
  }

  const service = {
    create
  }

  return [
    resources,
    service
  ]
}
