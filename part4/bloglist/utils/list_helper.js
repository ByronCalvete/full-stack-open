const dumy = (blogs) => {
  return 1
}

const totalLikes = (blogs = []) => {
  const likes = blogs
    .map(blog => blog.likes)
    .reduce((sum, item) => sum + item, 0)

  return likes
}

const favoriteBlog = (blogs = []) => {
  const listOfLikes = blogs.map(blog => blog.likes)

  if (!listOfLikes.length) {
    return 'No blogs yet'
  }

  const mostLikedBlog = Math.max(...listOfLikes)
  const indexOfBlogFavoriteBlog = listOfLikes.indexOf(mostLikedBlog)

  const maxVotedBlog = {
    title: blogs[indexOfBlogFavoriteBlog]?.title,
    author: blogs[indexOfBlogFavoriteBlog]?.author,
    likes: blogs[indexOfBlogFavoriteBlog]?.likes
  }

  return maxVotedBlog
}

module.exports = {
  dumy,
  totalLikes,
  favoriteBlog
}
