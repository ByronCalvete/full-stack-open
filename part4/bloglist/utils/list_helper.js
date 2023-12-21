const dumy = (blogs) => {
  return 1
}

const totalLikes = (blogs = []) => {
  const likes = blogs
    .map(blog => blog.likes)
    .reduce((sum, item) => sum + item, 0)

  return likes
}

module.exports = {
  dumy,
  totalLikes
}
