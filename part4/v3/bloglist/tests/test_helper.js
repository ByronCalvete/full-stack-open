const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'My first blog for testing',
    author: 'Rocky Calvete',
    url: 'www.rockycalvete.com',
    likes: 4
  },
  {
    title: 'My second blog for testing',
    author: 'Rocky Calvete',
    url: 'www.rockycalvete.com',
    likes: 7
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}
