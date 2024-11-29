import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from './constants';

function Products() {
  return (
    <div>
      <h1 style={{width: '100%', textAlign: 'center'}}>Our Products</h1>
      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
      </div>
    </div>
  );
}

export default Products;