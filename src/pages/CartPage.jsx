import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage({ cart, removeFromCart }) {
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <section className="shopping-cart">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <>
          <p className="empty-cart">Your cart is empty.</p>
          <Link to="/products">Browse Products</Link>
        </>
      ) : (
        <>
          {cart.map((item, index) => (
            <CartItem
              key={`${item.id}-${index}`}
              item={item}
              onRemove={removeFromCart}
            />
          ))}

          <h3 className="cart-total">
            Total: ${cartTotal.toFixed(2)}
          </h3>
        </>
      )}
    </section>
  );
}

export default CartPage;