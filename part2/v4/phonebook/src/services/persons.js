import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)

  // const request = fetch(baseUrl)
  //   .then(response => response.json())
  // return request.then(json => json)
}

const create = (newPerson) => {
  // const request = axios.post(baseUrl, newPerson)
  // return request.then(response => response.data)

  const request = fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPerson)
  })
    .then(response => response.json())
  return request.then(json => json)
}

export default { getAll, create }
