const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new note' }).click()
  await page.getByPlaceholder('write a title').fill(title)
  await page.getByPlaceholder('write an author').fill(author)
  await page.getByPlaceholder('write an url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }
