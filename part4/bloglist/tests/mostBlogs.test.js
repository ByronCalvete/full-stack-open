const listHelper = require('../utils/list_helper')
const blogs = require('../utils/listOfBlogs')

describe('most blogs', () => {
  test('when there is no blogs', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe('No blogs yet')
  })

  test('when blogs has only one blog', () => {
    const result = listHelper.mostBlogs([blogs[0]])
    expect(result).toEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })

  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})
