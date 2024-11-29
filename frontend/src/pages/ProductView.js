import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductView.css';

export default function ProductView({ products, addToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === parseInt(productId));

  if (!product) {
    return <div>Product not found!</div>;
  }

  const { id, image, name, description, price } = product;

  return (
    <div className="product-view-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="product-view">
        <img src={image} alt={name} className="product-view-image" />
        <div className="product-view-details">
          <h2 className="product-view-name">{name}</h2>
          <p className="product-view-description">{description}</p>
          <p className="product-view-price">Price: ${price.toFixed(2)}</p>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}