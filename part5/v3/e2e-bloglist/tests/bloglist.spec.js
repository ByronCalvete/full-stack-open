const { test, expect, beforeEach, describe } = require('playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'root',
        name: "Root",
        password: 'sekret'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('sekret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Root logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText('Root logged in')).not.toBeVisible()
    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('root')
        await page.getByTestId('password').fill('sekret')
        await page.getByRole('button', { name: 'login' }).click()
      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByTestId('title').fill('The best blog of the history')
        await page.getByTestId('author').fill('Rocky El Loco')
        await page.getByTestId('url').fill('www.rocky.com')
        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.locator('.blog').getByText('The best blog of the history', { exact: false })).toBeVisible()
      })
    })
  })
})
