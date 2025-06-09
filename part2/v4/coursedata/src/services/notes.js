import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  // const nonExisting = {
  //   id: 1000,
  //   content: 'This note is not saved to server',
  //   important: false
  // }
  // return request.then(response => response.data.concat(nonExisting))
  return request.then(response => response.data)

  // const request = fetch(baseUrl)
  //   .then(response => response.json())
  //   .then(json => json)
  // return request
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)

  // const request = fetch(baseUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(newObject)
  // })
  //   .then(response => response.json())
  //   .then(json => json)
  // return request
}

const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)

  // const request =  fetch(`${baseUrl}/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(updatedObject)
  // })
  //   .then(response => response.json())
  //   .then(json => json)
  // return request
}

export default { getAll, create, update }
