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

test('create a new blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog = {
    title: 'New Blog test creation',
    author: 'Create new post author',
    url: 'www.posttest/com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(blog => blog.title)

  assert.strictEqual(titles.includes(newBlog.title), true)
  assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)
})

test('default likes to 0 when the likes property is missing', async () => {
  const newBlog = {
    title: 'New Blog test creation',
    author: 'Create new post author',
    url: 'www.posttest/com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.filter(blog => blog.title === newBlog.title)
  assert.strictEqual(addedBlog[0].likes, 0)
})

test('error 400 if the title property is missing', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog = {
    author: 'Create new post author',
    url: 'www.posttest/com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

test('error 400 if the url property is missing', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog = {
    title: 'New Blog test creation',
    author: 'Create new post author',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
})
