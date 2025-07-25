import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const validator = (request, response, next) => {
  const { content } = request.body

  if (request.method === 'POST' && (!content || content.length < 5)) {
    return response.status(400).json({ error: 'too short anecdote, must have 5 length or more' })
  } else {
    next()
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
