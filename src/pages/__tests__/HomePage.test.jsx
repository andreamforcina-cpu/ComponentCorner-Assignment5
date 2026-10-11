import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../HomePage'

describe('HomePage', () => {
  it('renders the welcome heading and main content', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Welcome to ComponentCorner' })).toBeInTheDocument()
    expect(screen.getByText(/Find useful technology and accessories/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Why Shop With Us?' })).toBeInTheDocument()
  })
  it('links shoppers to the products page', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    expect(screen.getByRole('link', { name: 'Shop Products' })).toHaveAttribute('href', '/products')
  })
})
