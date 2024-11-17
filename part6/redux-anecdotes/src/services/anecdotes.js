const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
  const request = fetch(baseUrl)
    .then(response => response.json())
    .then(json => json)
  return request
}

export default { getAll }
