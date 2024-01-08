const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('verify the initial blog posts saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(titles).toContain('Rocky, the most spoiled dog in the world')
  })
})

describe('addition of new blog post', () => {
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
    const blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
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

    const blogs = await helper.blogsInDb()
    const lastAddedBlog = blogs.at(-1)

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

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
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

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('verify identifier', () => {
  test('id is the only blog post identifier property', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs[0].id).toBeDefined()
    expect(blogs[0]._id).not.toBeDefined()
  })
})

describe('delete blog post', () => {
  test('success with status code 204', async () => {
    const blogPostsAtStart = await helper.blogsInDb()
    const blogPostToDelete = blogPostsAtStart[0]

    await api
      .delete(`/api/blogs/${blogPostToDelete.id}`)
      .expect(204)

    const blogPostsAtEnd = await helper.blogsInDb()
    const titles = blogPostsAtEnd.map(blog => blog.title)

    expect(blogPostsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(titles).not.toContain(blogPostToDelete.title)
  })
})

describe('update blog post', () => {
  test('a blog can be updated', async () => {
    const blogPostsAtStart = await helper.blogsInDb()
    const updatedBlogPost = { ...blogPostsAtStart[0], likes: 10 }

    await api
      .put(`/api/blogs/${updatedBlogPost.id}`)
      .send(updatedBlogPost)
      .expect(200)

    const blogPostsAtEnd = await helper.blogsInDb()
    const likes = blogPostsAtEnd.map(blog => blog.likes)

    expect(blogPostsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(likes).toContain(10)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
