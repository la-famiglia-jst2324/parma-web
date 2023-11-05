import { render } from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom'

describe('Home Page Test', () => {
  test('renders landing page', () => {
    const { getByText } = render(<Home />)
    expect(getByText('Docs')).toBeInTheDocument()
    expect(getByText('Find in-depth information about Next.js features and API.')).toBeInTheDocument()
    // TODO: add more assertions
  })
})
