const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
