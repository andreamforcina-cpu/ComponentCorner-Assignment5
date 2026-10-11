import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

function App() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "https://placehold.co/600x400",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 249.99,
      image: "https://placehold.co/600x400",
      description: "Fitness tracker with heart rate monitor and GPS",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "https://placehold.co/600x400",
      description: "Portable waterproof speaker with 360-degree sound",
    },
    {
      id: 4,
      name: "Laptop Stand",
      price: 49.99,
      image: "https://placehold.co/600x400",
      description: "Ergonomic aluminum stand for laptops and tablets",
    },
    {
      id: 5,
      name: "Webcam",
      price: 129.99,
      image: "https://placehold.co/600x400",
      description: "4K webcam with auto-focus and noise reduction",
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      price: 159.99,
      image: "https://placehold.co/600x400",
      description: "RGB backlit keyboard with custom switches",
    },
  ];

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => {
      const index = currentCart.findIndex((item) => item.id === id);

      if (index === -1) {
        return currentCart;
      }

      return currentCart.filter((item, itemIndex) => itemIndex !== index);
    });
  };

  return (
    <BrowserRouter>
      <Header cartCount={cart.length} />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetailsPage
                products={products}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;