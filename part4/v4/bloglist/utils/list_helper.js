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

module.exports = { dummy, totalLikes }
