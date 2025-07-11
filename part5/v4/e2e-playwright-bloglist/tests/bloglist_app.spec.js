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

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await page.getByTestId('username').fill('rocky')
        await page.getByTestId('password').fill('loco')
        await page.getByRole('button', { name: 'login' }).click()
      })

      test('a new blog can created', async ({ page }) => {
        await page.getByRole('button', { name: 'new note' }).click()
        await page.getByPlaceholder('write a title').fill('a new note created')
        await page.getByPlaceholder('write an author').fill('the author of the note')
        await page.getByPlaceholder('write an url').fill('www.test.com')
        await page.getByRole('button', { name: 'create' }).click()

        await expect(page.getByText('a new note created - the author of the note')).toBeVisible()
      })

      describe('when a note was created', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'new note' }).click()
          await page.getByPlaceholder('write a title').fill('a new note created')
          await page.getByPlaceholder('write an author').fill('the author of the note')
          await page.getByPlaceholder('write an url').fill('www.test.com')
          await page.getByRole('button', { name: 'create' }).click()
        })

        test('a note can be liked', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()

          await expect(page.getByText('likes 1')).toBeVisible()
        })
      })
    })
  })
})
