const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const note = await Note.findById(id)
  if (note) {
    response.json(note)
  } else {
    response.status(400).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Note.findByIdAndDelete(id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true, runValidators: true, context: 'query' })
  response.json(updatedNote)
})

module.exports = notesRouter
