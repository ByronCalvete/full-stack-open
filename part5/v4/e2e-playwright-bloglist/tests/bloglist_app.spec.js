const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
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
})
