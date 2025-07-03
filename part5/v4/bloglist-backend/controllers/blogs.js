const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body

  const decodedToken = request.user

  const user = await User.findById(decodedToken.id)

  if(!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user:  user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = [...user.blogs, savedBlog._id ]
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedblog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })
    response.json(updatedblog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  
  const decodedToken = request.user

  if (decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({
      error: 'this user cannot delete this blog'
    })
  }

  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
