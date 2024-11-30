import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Contact from "./pages/Contact";
import Card from "./pages/Cart";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Navbar from "./components/Navbar";
import "./assets/styles/App.css";
import axios from 'axios';

function App() {
  const [cart, setCart] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/products')
      .then((response) => {
        setProducts(response.data);
        console.log('Products fetched:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const addToCart = (product) => {
      if (cart.find((item) => item.id === product.id)) {
        alert("Product already in cart!");
        return;
      }
      alert(`${product.name} added to cart!`);
      setCart([...cart, { ...product, quantity: 1 }]);
  };

  const onRemoveItem = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
  };

  const onUpdateQuantity = (productId, newQuantity) => {
    const newCart = cart.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    );
    setCart(newCart);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/product/:productId"
              element={
                <ProductView products={products} addToCart={addToCart} />
              }
            />
            <Route
              path="/cart"
              element={
                <Card
                  cartItems={cart}
                  onRemoveItem={onRemoveItem}
                  onUpdateQuantity={onUpdateQuantity}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
