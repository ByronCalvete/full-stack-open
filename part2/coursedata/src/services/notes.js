import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'
// Async await
export const getAll = async () => {
  const request =  axios.get(baseUrl)
  const response = await request
  return response.data
}
// Async await
export const create = async (noteToAdd) => {
  const request = axios.post(baseUrl, noteToAdd)
  const response = await request
  return response.data
}
// Promises
export const update = (id, changedNote) => {
  const request = axios.put(`${baseUrl}/${id}`, changedNote)
  return request.then(response => response.data)
}
