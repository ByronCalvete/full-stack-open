const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Contenido de la nota 1',
    important: true
  },
  {
    id: 2,
    content: 'Contenido de la nota 2',
    important: false
  },
  {
    id: 3,
    content: 'Contenido de la nota 3',
    important: false
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hi, Byron!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.statusMessage = `There are no resources corresponding to the note with id number ${id}`
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const generatedId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const newNote = {
    id: generatedId(),
    content: body.content,
    important: typeof body.important !== 'undefined' ? body.important : false
  }

  notes = [...notes, newNote]
  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
