const express = require('express') 
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())

morgan.token('data', (request) => {
  return request.method === 'POST' && JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Phonebook application</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.statusMessage = `Not person with id ${id}`
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
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

  // const nameExist = persons.filter(person => person.name === body.name)

  // if (nameExist.length > 0) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson.save().then(savedPerson => {
    response.status(201).json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
