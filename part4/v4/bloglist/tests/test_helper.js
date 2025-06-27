const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Danna la fea',
    url: 'www.dannalafea.com',
    likes: 2
  },
  {
    title: 'Blog 2',
    author: 'Rocky el loco',
    url: 'www.rockyelloco.com',
    likes: 4
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
