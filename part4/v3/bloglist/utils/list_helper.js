const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const totalLikes = likes.reduce((sum, item) => {
    return sum + item
  }, 0)

  return likes.length === 0
    ? 0
    : totalLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return 'There is no blogs yet!'

  const likes = blogs.map(blog => blog.likes)
  const numberOfMaximumLikes = Math.max(...likes)
  const blogWithMostLikes = blogs.find(blog => blog.likes === numberOfMaximumLikes)

  const favorite = {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }

  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 'No blogs published yet!'

  const authors = blogs.map(blog => blog.author)

  const authorsFrequency = {}
  authors.forEach(author => authorsFrequency[author] = (authorsFrequency[author] || 0) + 1)
  const maxNumber = Math.max(...Object.values(authorsFrequency))

  for (const [key, value] of Object.entries(authorsFrequency)) {
    if (value === maxNumber) {
      return {
        author: key,
        blogs: value
      }
    }
  }

  const mostAuthor = {
    author: authorsFrequency,
    blogs: maxNumber
  }

  console.log(authorsFrequency)
  console.log(mostAuthor)

  return mostAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
