const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await helper.blogsInDb()

  assert.strictEqual(response.length, helper.initialBlogs.length)
})

test('the unique identifier property is named id', async () => {
  const response = await helper.blogsInDb()

  response.forEach(blog => {
    const key = Object.keys(blog)
    assert.strictEqual(key.includes('id'), true)
    assert.strictEqual(key.includes('_id'), false)
  })
})

after(async () => {
  await mongoose.connection.close()
})
