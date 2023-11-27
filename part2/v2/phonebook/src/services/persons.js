import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
  // const request = fetch(baseUrl)
  //   .then(response => response.json())
  //   .then(json => json)
  // return request
}

export const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
  // const request = fetch(baseUrl, {
  //   method: 'POST',
  //   body: JSON.stringify(newPerson),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(json => json)
  // return request
}

export const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
  // const request = fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
  // return request
}
