const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const personsRouter = require('./controllers/persons')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to Mongo')
  })
  .catch(error => {
    logger.error('error connecting to Mongo', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
