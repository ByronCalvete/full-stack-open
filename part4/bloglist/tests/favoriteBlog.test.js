const listHelper = require('../utils/list_helper')
const blogs = require('../utils/listOfBlogs')

describe('favorite blog', () => {
  test('when there are no blogs', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe('No blogs yet')
  })

  test('when find the favorite blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})
