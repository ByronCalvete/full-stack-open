import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  // const nonExisting = {
  //   id: 10000,
  //   content: 'This note is not saved to server',
  //   important: true,
  // }
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
  //   body: JSON.stringify(newObject),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(json => json)
  // return request
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)

  // const request = fetch(`${baseUrl}/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(newObject),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(json => json)
  //   return request
}

export default {
  getAll,
  create,
  update
}
