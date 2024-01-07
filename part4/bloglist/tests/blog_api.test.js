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

test('verifes that id is the only blog post identifier property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  expect(blogs[0].id).toBeDefined()
  expect(blogs[0]._id).not.toBeDefined()
})

test('a valid blog post can be added', async () => {
  const newBlog = {
    title: 'New blog for testing POST method',
    author: 'Testing POST',
    url: 'www.example.com/test-post',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // const blogsAtEnd = await Blog.find({})
  // const titles = blogsAtEnd.map(blog => blog.title)
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain('New blog for testing POST method')
})

test('check the default value of likes is zero when don\'t defined it', async () => {
  const newBlog = {
    title: 'New blog for testing like default value',
    author: 'Testing likes delfault',
    url: 'www.example.com/likes-default',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const lastAddedBlog = response.body.at(-1)

  expect(lastAddedBlog.likes).toBe(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Test with no title',
    url: 'www.example.com/no-title',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Blog without url',
    author: 'Myself',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('delete blog post', async () => {
  const blogPostsAtStart = await api.get('/api/blogs')
  const blogPostToDelete = blogPostsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogPostToDelete.id}`)
    .expect(204)

  const blogPostsAtEnd = await api.get('/api/blogs')
  const titles = blogPostsAtEnd.body.map(blog => blog.title)

  expect(blogPostsAtEnd.body).toHaveLength(initialBlogs.length - 1)
  expect(titles).not.toContain(blogPostToDelete.title)
})

test('a blog can be updated', async () => {
  const blogPostsAtStart = await api.get('/api/blogs')
  const updatedBlogPost = { ...blogPostsAtStart.body[0], likes: 10 }

  await api
    .put(`/api/blogs/${updatedBlogPost.id}`)
    .send(updatedBlogPost)
    .expect(200)

  const blogPostsAtEnd = await api.get('/api/blogs')
  const likes = blogPostsAtEnd.body.map(blog => blog.likes)

  expect(blogPostsAtEnd.body).toHaveLength(initialBlogs.length)
  expect(likes).toContain(10)
})

afterAll(async () => {
  await mongoose.connection.close()
})
