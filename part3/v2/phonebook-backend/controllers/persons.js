const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => {
      next(error)
    })
})

personsRouter.get('/info', (request, response, next) => {
  const date = new Date()
  Person.find({})
    .then(result => {
      response.send(`
        <p>Phonebook has info of ${result.length} persons</p>
        <p>${date.toString()}</p>
      `)
    })
    .catch(error => {
      next(error)
    })
})

personsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      console.log(person)
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number missing'
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save()
    .then(savedPerson => {
      response.status(201).json(savedPerson)
    })
    .catch(error => {
      next(error)
    })
})

personsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

personsRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(personUpdated => {
      response.json(personUpdated)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = personsRouter
