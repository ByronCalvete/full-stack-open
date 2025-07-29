const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

describe('users test suite', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('get all users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('create a new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'Test test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    const usernames = usersAtEnd.map(user => user.username)

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    assert.strictEqual(usernames.includes(newUser.username), true)
  })

  test('create user fails when when the username is already exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'My Root',
      password: 'root'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
    assert.strictEqual(result.body.error.includes('expected `username` to be unique'), true)
  })

  test('create user fails if username length is shorter than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gh',
      name: 'Test test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })

  test('create user fails if password length is shorter than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gh',
      name: 'Test test',
      password: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  mongoose.connection.close()
})
