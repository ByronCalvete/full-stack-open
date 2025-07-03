const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blogs')

const api = supertest(app)

describe('blog post api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  describe('get notes correctly', () => {
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
  })

  describe('viewing a specific blog', () => {
    test('the unique identifier property is named id', async () => {
      const response = await helper.blogsInDb()
    
      response.forEach(blog => {
        const key = Object.keys(blog)
        assert.strictEqual(key.includes('id'), true)
        assert.strictEqual(key.includes('_id'), false)
      })
    })
  })

  describe('create a blog', () => {
    test('create a new blog post', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const user = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const token = user._body.token

      const newBlog = {
        title: 'New Blog test creation',
        author: 'Create new post author',
        url: 'www.posttest/com',
        likes: 2
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)
    
      assert.strictEqual(titles.includes(newBlog.title), true)
      assert.strictEqual(blogsAtStart.length + 1, blogsAtEnd.length)
    })
    
    test('default likes to 0 when the likes property is missing', async () => {
      const user = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const token = user._body.token

      const newBlog = {
        title: 'New Blog test creation',
        author: 'Create new post author',
        url: 'www.posttest/com'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      const addedBlog = blogsAtEnd.filter(blog => blog.title === newBlog.title)
      assert.strictEqual(addedBlog[0].likes, 0)
    })
    
    test('error 400 if the title property is missing', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const user = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const token = user._body.token

      const newBlog = {
        author: 'Create new post author',
        url: 'www.posttest/com',
        likes: 2
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })
    
    test('error 400 if the url property is missing', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const user = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const token = user._body.token

      const newBlog = {
        title: 'New Blog test creation',
        author: 'Create new post author',
        likes: 2
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with status code 401 if token is not provided', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const newBlog = {
        title: 'New Blog test creation',
        author: 'Create new post author',
        url: 'www.posttest/com',
        likes: 2
      }

      const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)

      assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
      assert.strictEqual(!titles.includes(newBlog.title), true)
      assert(result.body.error.includes('token invalid'))
    })
  })

  describe('updating a blog', () => {
    test('a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
    
      const blogUpdated = { ...blogToUpdate, likes: 100 }
    
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogUpdated)
        .expect(200)
      
      const blogsAtEnd = await helper.blogsInDb()
    
      assert.strict(blogsAtStart.length, blogsAtEnd.length)
      assert.strict(blogsAtEnd[0].likes, blogUpdated.likes)
    })
  })

  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      
      const newBlog = {
        title: 'New title',
        author: 'New author',
        url: 'www.new.com',
        likes: 3
      }

      const user = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      const token = user._body.token

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogs = await helper.blogsInDb()
      const blogToDelete = blogs[blogs.length - 1]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)

      assert.strictEqual(!titles.includes(blogToDelete.title), true)
      assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
