const Blog = require('../models/blogs')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Danna la fea',
    url: 'www.dannalafea.com',
    likes: 2,
    user: '686408fbda58bc58a9da4e17'
  },
  {
    title: 'Blog 2',
    author: 'Rocky el loco',
    url: 'www.rockyelloco.com',
    likes: 4,
    user: '686408fbda58bc58a9da4e17'
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
