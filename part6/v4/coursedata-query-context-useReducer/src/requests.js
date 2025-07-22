import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getNotes = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
}

export const createNote = (newNote) => {
  return axios.post(baseUrl, newNote)
    .then(response => response.data)
}

export const updateNote = (updatedNote) => {
  return axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then(response => response.data)
}
