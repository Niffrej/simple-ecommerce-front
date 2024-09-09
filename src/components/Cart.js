import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function Cart({ onClose }) {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4">
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        Fechar
      </button>
      <h2 className="text-xl font-bold mb-4">Carrinho</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>R$ {item.price.toFixed(2)}</span>
            <button
              className="text-red-500"
              onClick={() => removeFromCart(item)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold">Total: R$ {total.toFixed(2)}</div>
    </div>
  );
}

export default Cart;
