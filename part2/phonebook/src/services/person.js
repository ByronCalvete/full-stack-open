import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
// Promises
export const getAllPerson = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
// Async await
export const createPerson = async (newPersonToAdd) => {
  const request = axios.post(baseUrl, newPersonToAdd)
  const response = await request
  return response.data
}