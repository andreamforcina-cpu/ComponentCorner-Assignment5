import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="home-page">
      <h1>Welcome to ComponentCorner</h1>

      <p>
        Find useful technology and accessories for your everyday setup.
        Browse our products and add your favorite items to your cart.
      </p>

      <Link to="/products">
        <button>Shop Products</button>
      </Link>

      <h2>Why Shop With Us?</h2>

      <p>
        ComponentCorner offers a simple shopping experience with quality
        technology products at competitive prices.
      </p>
    </section>
  );
}

export default HomePage;