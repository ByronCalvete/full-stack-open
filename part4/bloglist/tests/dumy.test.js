const listHelper = require('../utils/list_helper')

describe('dumy', () => {
  test('dumy returns one', () => {
    const blogs = []

    const result = listHelper.dumy(blogs)
    expect(result).toBe(1)
  })
})
