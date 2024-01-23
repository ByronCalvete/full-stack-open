const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user =  new User({
    username: 'root',
    name: 'El Root',
    passwordHash,
  })

  await user.save()
})

describe('create a new user', () => {
  test('create user is succeed', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hola',
      name: 'Hola amigos',
      password: 'holahola'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    const userNames = usersAtEnd.map(user => user.username)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(userNames).toContain(newUser.username)
  })

  test('creation fails with status code 400 if the username already exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Otro root',
      password: 'secretagain'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username should be required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'without username',
      password: 'silence'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` is required')

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password should be required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'user',
      name: 'without password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('Password is missing')

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username must be at least 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ho',
      name: 'Hola amigos',
      password: 'holahola'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3).')

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password must be at least 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hola',
      name: 'Hola amigos',
      password: 'ho'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('The password has at least 3 characters')

    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
