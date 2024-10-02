const { test, expect, beforeEach, describe } = require('playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'root',
        name: "Root",
        password: 'sekret'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
      await expect(page.getByText('Root logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText('Root logged in')).not.toBeVisible()
    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'root', 'sekret')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'The best blog of the history', 'Rocky El Loco', 'www.rocky.com')
        await expect(page.getByText('a new blog The best blog of the history', { exact: false })).toBeVisible()
      })

      describe('a blogs exist', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'Blog 2', 'James', 'www.james.com')
          await createBlog(page, 'Blog 3', 'Falcao', 'www.falcao.com')
        })

        test('a blog can be liked', async({ page }) => {
          await page.getByText('Blog 2').getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()

          await expect(page.getByText('likes 1')).toBeVisible()
        })
      })
    })
  })
})
