import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '../ProductCard'

const product = { id: 42, name: 'Test Headphones', price: 19.5, image: '/headphones.png', description: 'Comfortable wireless audio' }

describe('ProductCard', () => {
  it('renders product props and the add button', () => {
    const onAddToCart = vi.fn()
    render(<ProductCard product={product} onAddToCart={onAddToCart} />)
    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument()
    expect(screen.getByText('$19.50')).toBeInTheDocument()
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: product.name })).toHaveAttribute('src', product.image)
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeEnabled()
    expect(onAddToCart).not.toHaveBeenCalled()
  })
  it('passes the exact product to the callback on click', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()
    render(<ProductCard product={product} onAddToCart={onAddToCart} />)
    await user.click(screen.getByRole('button', { name: 'Add to Cart' }))
    expect(onAddToCart).toHaveBeenCalledExactlyOnceWith(product)
  })
  it('handles repeated clicks', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()
    render(<ProductCard product={product} onAddToCart={onAddToCart} />)
    await user.dblClick(screen.getByRole('button', { name: 'Add to Cart' }))
    expect(onAddToCart).toHaveBeenCalledTimes(2)
  })
})
