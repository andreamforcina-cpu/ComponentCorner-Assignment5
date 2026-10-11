import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartItem from '../CartItem'

const item = { id: 42, name: 'Test Headphones', price: 19.5 }

describe('CartItem', () => {
  it('renders name, price, and one unit for the current cart data model', () => {
    const onRemove = vi.fn()
    render(<CartItem item={item} onRemove={onRemove} />)
    expect(screen.getByRole('heading', { name: item.name })).toBeInTheDocument()
    expect(screen.getByText('$19.50')).toBeInTheDocument()
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove' })).toBeEnabled()
    expect(onRemove).not.toHaveBeenCalled()
  })
  it('displays an explicitly supplied quantity', () => {
    render(<CartItem item={{ ...item, quantity: 3 }} onRemove={vi.fn()} />)
    expect(screen.getByText('Quantity: 3')).toBeInTheDocument()
  })
  it('passes the item id to the remove callback', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<CartItem item={item} onRemove={onRemove} />)
    await user.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onRemove).toHaveBeenCalledExactlyOnceWith(item.id)
  })
})
