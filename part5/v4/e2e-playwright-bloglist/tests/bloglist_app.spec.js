const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Rocky Calvete',
        username: 'rocky',
        password: 'loco'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('Bloglist App')
    const loginTitle = await page.getByText('Log in to application')
    const loginButton = await page.getByRole('button', { name: 'login' })

    await expect(locator).toBeVisible()
    await expect(loginTitle).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('rocky')
      await page.getByTestId('password').fill('loco')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Rocky Calvete logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('rocky')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Rocky Calvete logged-in')).not.toBeVisible()
    })
  })
})
