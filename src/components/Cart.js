import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

function Cart({ onClose }) {
  const { cartItems = [], removeFromCart } = useCart(); // Define um array vazio por padrão

  // Log para depuração
  useEffect(() => {
    console.log('Cart items:', cartItems);
  }, [cartItems]);

  // Verifica se `cartItems` é um array válido
  if (!Array.isArray(cartItems)) {
    console.error('cartItems não é um array:', cartItems);
    return <p className="text-red-500">Erro ao carregar o carrinho.</p>;
  }

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
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item._id || item.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <span className="font-semibold">{item.name || 'Produto sem nome'}</span>
                <div>
                  <span>Quantidade: {item.quantity || 1}</span>
                  <span className="ml-2">
                    Preço: {item.price ? `$${item.price.toFixed(2)}` : 'Indisponível'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item._id || item.id)} 
                className="text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        )}
      </ul>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;
