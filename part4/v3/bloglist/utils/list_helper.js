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

module.exports = {
  dummy,
  totalLikes
}
