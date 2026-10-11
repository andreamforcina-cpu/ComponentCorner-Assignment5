import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

const headphones = { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://placehold.co/600x400', description: 'Premium noise-cancelling headphones with 30-hour battery life' }
let storage
let values

beforeEach(() => {
  values = {}
  storage = {
    getItem: vi.fn((key) => values[key] ?? null),
    setItem: vi.fn((key, value) => { values[key] = String(value) }),
    removeItem: vi.fn((key) => { delete values[key] }),
    clear: vi.fn(() => { values = {} }),
  }
  vi.stubGlobal('localStorage', storage)
  window.history.replaceState({}, '', '/')
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('App cart state and persistence', () => {
  it('renders home and initializes an empty cart', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Welcome to ComponentCorner' })).toBeInTheDocument()
    expect(storage.getItem).toHaveBeenCalledWith('cart')
    await waitFor(() => expect(storage.setItem).toHaveBeenCalledWith('cart', '[]'))
  })
  it('loads saved cart items and displays the correct total', async () => {
    values.cart = JSON.stringify([headphones])
    window.history.replaceState({}, '', '/cart')
    render(<App />)
    expect(screen.getByRole('heading', { name: headphones.name })).toBeInTheDocument()
    expect(screen.getByText('Total: $99.99')).toBeInTheDocument()
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument()
    await waitFor(() => expect(storage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([headphones])))
  })
  it('adds a product and persists changes after the state update', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: 'Products', exact: true }))
    await user.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    await waitFor(() => expect(JSON.parse(values.cart)).toEqual([headphones]))
    await user.click(screen.getByRole('link', { name: 'Cart', exact: true }))
    expect(screen.getByRole('heading', { name: headphones.name })).toBeInTheDocument()
  })
  it('removes only one occurrence of a repeated product and saves the result', async () => {
    const user = userEvent.setup()
    values.cart = JSON.stringify([headphones, headphones])
    window.history.replaceState({}, '', '/cart')
    render(<App />)
    expect(screen.getByText('Total: $199.98')).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'Remove' })[0])
    await waitFor(() => expect(JSON.parse(values.cart)).toEqual([headphones]))
    expect(screen.getAllByRole('heading', { name: headphones.name })).toHaveLength(1)
    expect(screen.getByText('Total: $99.99')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove' }))
    await waitFor(() => expect(JSON.parse(values.cart)).toEqual([]))
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })
  it('restores added products after unmounting and reopening the app', async () => {
    const user = userEvent.setup()
    const view = render(<App />)
    await user.click(screen.getByRole('link', { name: 'Products', exact: true }))
    await user.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    await waitFor(() => expect(JSON.parse(values.cart)).toEqual([headphones]))
    view.unmount()
    window.history.replaceState({}, '', '/cart')
    render(<App />)
    expect(screen.getByRole('heading', { name: headphones.name })).toBeInTheDocument()
  })
  it.each(['broken JSON', '{}', 'null', '[null]', '[{"id":1}]'])('recovers from invalid saved data: %s', (saved) => {
    values.cart = saved
    window.history.replaceState({}, '', '/cart')
    render(<App />)
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })
  it('renders when reading browser storage fails', () => {
    storage.getItem.mockImplementation(() => { throw new Error('Storage disabled') })
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Welcome to ComponentCorner' })).toBeInTheDocument()
  })
  it('allows cart operations when writing browser storage fails', async () => {
    storage.setItem.mockImplementation(() => { throw new Error('Storage full') })
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: 'Products', exact: true }))
    await user.click(screen.getAllByRole('button', { name: 'Add to Cart' })[0])
    await user.click(screen.getByRole('link', { name: 'Cart', exact: true }))
    expect(screen.getByRole('heading', { name: headphones.name })).toBeInTheDocument()
  })
  it('supports direct product-detail routes and adding from details', async () => {
    window.history.replaceState({}, '', '/products/1')
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('heading', { name: headphones.name })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Add to Cart' }))
    await waitFor(() => expect(JSON.parse(values.cart)).toEqual([headphones]))
  })
  it('shows a useful message for a missing product', () => {
    window.history.replaceState({}, '', '/products/999')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Product Not Found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to Products' })).toHaveAttribute('href', '/products')
  })
})
