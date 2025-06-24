const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

app.get('/api/blogs', (request, response, next) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error =>  next(error))
})

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
