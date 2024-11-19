const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  const request = fetch(baseUrl)
    .then(response => response.json())
    .then(json => json)
  return request
}

const createNew = (content) => {
  const object = { content, votes: 0 }
  const request = fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
    .then(response => response.json())
    .then(json => json)
  return request
}

const vote = (id, newAnecdote) => {
  const request = fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newAnecdote),
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
  vote
}
