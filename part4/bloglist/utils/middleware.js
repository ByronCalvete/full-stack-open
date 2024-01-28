const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: 'unknown endpoint' })
}

const getToken = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  getToken,
  errorHandler
}
