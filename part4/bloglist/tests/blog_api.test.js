const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'Rocky, the most spoiled dog in the world',
    author: 'Simon Tolomeo',
    url: 'www.example.com/rocky',
    likes: 2
  },
  {
    title: 'Blogpost 2',
    author: 'Simon Tolomeo Jr.',
    url: 'www.example.com/second',
    likes: 4
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(titles).toContain('Rocky, the most spoiled dog in the world')
})

afterAll(async () => {
  await mongoose.connection.close()
})
