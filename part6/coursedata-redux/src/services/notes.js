const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = fetch(baseUrl)
    .then(response => response.json())
    .then(json => json)
  return request
}

const createNew = (content) => {
  const object = { content, important: false }
  const request = fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => response.json())
    .then(json =>  json)
  return request
}

const toggleImportance = (id, newNote) => {
  const request = fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newNote),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => response.json())
    .then(json => json)
  return request
}

export default {
  getAll,
  createNew,
  toggleImportance
}
