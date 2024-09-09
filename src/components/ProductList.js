import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, addToCart }) { // Recebe addToCart como prop
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map(product => (
          <ProductItem key={product._id} product={product} onAddToCart={addToCart} />
        ))
      ) : (
        <p className="text-center col-span-4">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}

export default ProductList;
