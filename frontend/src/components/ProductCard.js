import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

// product card component that displays each product with its details
export default function ProductCard({ product }) {
  const { id, image, name, description, price } = product;
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${id}`)}>
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
