import React from 'react';
import ProductItem from './ProductCard';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductItem key={product._id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
