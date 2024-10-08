const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = request.user

  const user = await User.findById(decodedToken.id)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = request.user

  const blog = await Blog.findById(request.params.id)

  if (decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({
      error: 'this user cannot delete this blog'
    })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blogPost = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlogPost = await Blog.findByIdAndUpdate(id, blogPost, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlogPost)
})

module.exports = blogsRouter
