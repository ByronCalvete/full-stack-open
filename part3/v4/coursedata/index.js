const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.static('dist'))
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello NodeJS world!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const { content, important } = request.body

  Note.findById(id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save()
        .then(updatedNote => {
          response.json(updatedNote)
        })
    })
    .catch(error =>  next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id =  request.params.id

  Note.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
