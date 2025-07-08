import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'This is the content of the note',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('This is the content of the note')
  expect(element).toBeDefined()
  // const { container } = render(<Note note={note} />)
  // const div = container.querySelector('.note')
  // expect(div).toHaveTextContent('This is the content of the note')
})

test('does not render this', () => {
  const note = {
    content: 'This is a simple content',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.queryByText('this thing is not rendered')
  expect(element).toBeNull()
})

test('clicking the button calls the event handler once', async () => {
  const note = {
    content: 'This is the content of the note',
    important: true
  }

  const mockHandler = vi.fn()
  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
