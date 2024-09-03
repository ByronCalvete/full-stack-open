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

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    const keys = Object.keys(blog)
    assert.strictEqual(keys.includes('id'), true)
    assert.strictEqual(keys.includes('_id'), false)
  })
})

test('create a new blog post', async () => {
  const newBlog = {
    title: 'Blog added',
    author: 'Me',
    url: 'www.me.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const newBlogs = response.body
  const titles = newBlogs.map(blog => blog.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert.strictEqual(titles.includes('Blog added'), true)
})

after(async () => {
  await mongoose.connection.close()
})