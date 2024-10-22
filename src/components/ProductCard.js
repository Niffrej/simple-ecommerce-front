import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

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

        <div className="mt-2">
          <label htmlFor={`quantity-${product._id}`} className="block text-gray-700">Quantidade:</label>
          <input
            id={`quantity-${product._id}`}
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded p-1 w-16"
          />
        </div>

        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition-colors"
          onClick={() => addToCart(product, quantity)}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
