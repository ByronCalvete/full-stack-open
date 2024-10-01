const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Root', passwordHash })

  await user.save()
})

describe('get users', () => {
  test('get all users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('create user', () => {
  test('creation succeeds with status code 201', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Test Test',
      username: 'test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert.strictEqual(usernames.includes(newUser.username), true)
  })

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      name: 'Root Root',
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(result.body.error.includes('expected `username` to be unique'), true)
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('creation fails if username length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'to',
      name: 'To To',
      password: 'tototo'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('creation fails is password length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'Test Test',
      password: 'te'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  mongoose.connection.close()
})
