import { Link } from "react-router-dom";

function Header({ cartCount }) {
  return (
    <header className="header">
      <h1>ComponentCorner</h1>

      <nav className="nav-menu">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <Link to="/cart" className="cart-container">
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cartCount}</span>
      </Link>
    </header>
  );
}

export default Header;