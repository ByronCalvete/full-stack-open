const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(400).end()
      }
    })
    .catch(error => {
      next(error)
    })
 })

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => {
      next(error)
    })
})

notesRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  
  Note.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

notesRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.params

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = notesRouter