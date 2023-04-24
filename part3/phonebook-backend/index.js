const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('data', (request) => {
  return request.method === 'POST' && JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'))

app.get('/', (request, response) => {
  response.send('<h1>This is a phonebook application backend</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  Person.countDocuments().then(count => {
    response.send(`<p>Phone has info for ${count} people<br/><br/>${date}</p>`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.statusMessage = `There are no sources corresponding to the person with the id number ${id}` 
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: !body.name
        ? 'name is missing'
        : 'number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(person => {
    console.log('person saved!')
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
