import ReactDOM from 'react-dom'
import {screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('renders the app', async () => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)

  require('..')

  await userEvent.type(screen.getByPlaceholderText(/search/i), 'voice of war')
  userEvent.click(screen.getByLabelText(/search/i))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(/voice of war/i)).toBeInTheDocument()

  // cleanup
  ReactDOM.unmountComponentAtNode(root)
  document.body.removeChild(root)
})
