const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  const likesOfBlogs = blogs.map(blog => blog.likes)
  const total = likesOfBlogs.reduce((sum, item) => {
    return sum + item
  }, 0)

  return total
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 'There are no blogs'
  } else if (blogs.length === 1) {
    return blogs[0]
  }

  const likesOfBlogs = blogs.map(blog => blog.likes)
  const mostLikes = Math.max(...likesOfBlogs)
  const blogWithMostLikes = blogs.find(blog => blog.likes === mostLikes)

  return blogWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
