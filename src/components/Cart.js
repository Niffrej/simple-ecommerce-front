import React from 'react';
import { useCart } from '../contexts/CartContext';

function Cart({ onClose }) {
  const { cartItems, removeFromCart } = useCart();

  // Calcula o total verificando se o item tem um valor de `price` definido
  const totalPrice = cartItems.reduce((acc, item) => {
    if (item && item.price) {
      return acc + item.price * (item.quantity || 1);
    }
    return acc;
  }, 0);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
      <button 
        onClick={onClose} 
        className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Fechar
      </button>
      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li key={item._id} className="flex justify-between items-center p-2 border-b">
            <div>
              <span className="font-semibold">{item.name}</span>
              <div>
                <span>Quantidade: {item.quantity}</span>
                <span className="ml-2">
                  Preço: {item.price ? `$${item.price.toFixed(2)}` : 'Indisponível'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item._id)} 
              className="text-red-500 hover:text-red-700"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;
