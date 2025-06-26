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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'There are no blogs'
  } else if (blogs.length === 1) {
    const mostAuthor = {
      author: blogs[0].author,
      blogs: 1
    }
    return mostAuthor
  }

  const authors = blogs.map(blog => blog.author)
  const totalBlogsByAuthor = authors.reduce((list, i) => {
    list[i] = (list[i] || 0) + 1
    return list
  }, {})

  const maxBlogs = Math.max(...Object.values(totalBlogsByAuthor))
  const mostFrecuentAuthor = Object.keys(totalBlogsByAuthor).filter(author => totalBlogsByAuthor[author] === maxBlogs)

  return {
    author: mostFrecuentAuthor[0],
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
