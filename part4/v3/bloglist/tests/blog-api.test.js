const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'My first blog for testing',
    author: 'Rocky Calvete',
    url: 'www.rockycalvete.com',
    likes: 4
  },
  {
    title: 'My second blog for testing',
    author: 'Rocky Calvete',
    url: 'www.rockycalvete.com',
    likes: 7
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
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

after(async () => {
  await mongoose.connection.close()
})
