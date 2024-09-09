import React from 'react';

function ProductItem({ product, onAddToCart }) { // Renomeei a prop para ficar mais claro
  return (
    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-700">{product.description}</p>
        <p className="mt-2 text-blue-600 font-semibold">R$ {product.price.toFixed(2)}</p>
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-colors"
          onClick={() => onAddToCart(product)} // Chama a função ao clicar
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
