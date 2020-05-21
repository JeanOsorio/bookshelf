import ReactDOM from 'react-dom'
import {waitForElementToBeRemoved, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {buildUser} from 'test/generate'

// this is a pretty comprehensive test and CI is pretty slow...
jest.setTimeout(25000)

test('can login and use the book search', async () => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)

  require('..')

  const user = buildUser()

  userEvent.click(screen.getByRole('button', {name: /register/i}))

  const modal = within(screen.getByRole('dialog'))
  await userEvent.type(modal.getByLabelText(/username/i), user.username)
  await userEvent.type(modal.getByLabelText(/password/i), user.password)

  userEvent.click(modal.getByRole('button', {name: /register/i}))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  userEvent.click(screen.getByRole('button', {name: /logout/i}))

  // cleanup
  ReactDOM.unmountComponentAtNode(root)
  document.body.removeChild(root)
})
