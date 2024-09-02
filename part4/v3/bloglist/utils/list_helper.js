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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
