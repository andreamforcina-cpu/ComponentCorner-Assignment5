import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductsPage({ products, addToCart }) {
  return (
    <section className="products-section">
      <h2>Our Products</h2>

      <div className="products">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={addToCart}
            />

            <Link to={`/products/${product.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;