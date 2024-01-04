const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    const note = await Note.findById(id)
    if (note) {
      response.json(note)
    } else {
      response.status(400).end()
    }
  } catch(error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch(error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

notesRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = notesRouter
