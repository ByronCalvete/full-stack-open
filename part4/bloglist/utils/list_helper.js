// eslint-disable-next-line no-unused-vars
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

const mostBlogs = (blogs = []) => {
  if (blogs.length === 0) return 'No blogs yet'
  // Only authors
  const authors = blogs.map(blog => blog.author)

  // blogs by author
  const totalBlogsByAuthor = authors.reduce((list, i) => {
    list[i] = (list[i] || 0) + 1
    return list
  }, {})

  // Number max of blogs
  const maxBlogs = Math.max(...Object.values(totalBlogsByAuthor))
  // Name author with most blogs
  const mostFrecuentAuthor = Object.keys(totalBlogsByAuthor).filter(author => totalBlogsByAuthor[author] === maxBlogs)

  return {
    author: mostFrecuentAuthor[0],
    blogs: maxBlogs
  }
}

const mostLikes = (blogs = []) => {
  if (blogs.length === 0) return 'No blogs yet'
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const authorWithMostLikes = blogs.filter(blog => blog.likes === maxLikes)

  return {
    author: authorWithMostLikes[0].author,
    likes: maxLikes,
  }
}

module.exports = {
  dumy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
