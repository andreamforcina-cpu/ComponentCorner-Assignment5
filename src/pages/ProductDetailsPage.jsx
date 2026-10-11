import { Link, useParams } from "react-router-dom";

function ProductDetailsPage({ products, addToCart }) {
  const { id } = useParams();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return (
      <section className="product-details">
        <h2>Product Not Found</h2>
        <Link to="/products">Back to Products</Link>
      </section>
    );
  }

  return (
    <section className="product-details">
      <img
        src={product.image}
        alt={product.name}
        width="400"
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>${product.price.toFixed(2)}</h3>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <br />
      <br />

      <Link to="/products">Back to Products</Link>
    </section>
  );
}

export default ProductDetailsPage;