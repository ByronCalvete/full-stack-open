const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('get posts', () => {
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
})

describe('create posts', () => {
  test('create a new blog post', async () => {
    const newBlog = {
      title: 'Blog added',
      author: 'Me',
      url: 'www.me.com',
      likes: 4
    }
  
    const res = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const token = res._body.token
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
  
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.strictEqual(titles.includes('Blog added'), true)
  })

  test('fails with proper status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Blog added',
      author: 'Me',
      url: 'www.me.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
  
  test('verify default value of likes property', async () => {
    const newBlog = {
      title: 'Blog added',
      author: 'Me',
      url: 'www.me.com'
    }
  
    const res = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const token = res._body.token
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const lastAddedBlog = blogsAtEnd.filter(blog => blog.title === 'Blog added')
    assert.strictEqual(lastAddedBlog[0].likes, 0)
  })
  
  test('verify missing title with status code 400', async () => {
    const newBlog = {
      author: 'Me',
      url: 'www.me.com',
      likes: 4
    }
  
    const res = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const token = res._body.token
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
  
  test('verify missing url with status code 400', async () => {
    const newBlog = {
      title: 'Blog added',
      author: 'Me',
      likes: 4
    }
  
    const res = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const token = res._body.token
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })  
})

describe('update post', () => {
  test('succeeds with status code 200 if the blog is updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const updatedBlog = { ...blogsAtStart[0], likes: 10 }
  
    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[0].likes, updatedBlog.likes)
  })
})

describe('delete post', () => {
  test('succeeds delete blog with status code 204', async () => {
    const newBlog = {
      title: 'Blog added',
      author: 'Me',
      url: 'www.me.com',
      likes: 4
    }
  
    const res = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const token = res._body.token
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[blogs.length-1]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog =>  blog.title)
  
    assert.strictEqual(!titles.includes(blogToDelete.title), true)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
