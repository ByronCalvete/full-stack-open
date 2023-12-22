const listHelper = require('../utils/list_helper')
const blogs = require('../utils/listOfBlogs')

describe('most likes', () => {
  test('when there is not blogs', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe('No blogs yet')
  })

  test('when has only one blog', () => {
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})
