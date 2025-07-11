const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'rocky', 'loco')
      await expect(page.getByText('Rocky Calvete logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'rocky', 'wrong')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Rocky Calvete logged-in')).not.toBeVisible()
    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'rocky', 'loco')
      })

      test('a new blog can created', async ({ page }) => {
        await createBlog(page, 'a new note created', 'the author of the note', 'www.test.com')
        await expect(page.getByText('a new note created - the author of the note')).toBeVisible()
      })

      describe('when a note was created', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'a new note created', 'the author of the note', 'www.test.com')
        })

        test('a note can be liked', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()

          await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('a test can be deleted', async ({ page }) => {
          await page.getByRole('button', { name: 'view' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          
          page.on('dialog', async (dialog) => {
            expect(dialog.type()).toContain('confirm')
            expect(dialog.message()).toContain('Remove blog a new note created by the author of the note')
            await dialog.accept()
          })
          await page.getByRole('button', { name: 'remove' }).click()

          await expect(page.getByText('a new note created - the author of the note')).not.toBeVisible()
        })
      })
    })
  })
})
