const baseUrl = '/api/users'

const getAllUsers = () => {
  const response = fetch(baseUrl)
    .then(response => response.json())
    .then(json => json)

  return response
}

export default { getAllUsers }
