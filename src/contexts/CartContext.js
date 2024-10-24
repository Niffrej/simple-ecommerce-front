import React, { createContext, useContext, useState } from 'react';

// Criação do Contexto
export const CartContext = createContext();

// Hook para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

// Provider do Cart
export const CartProvider = ({ children }) => {

  // Aqui deve ter o estado `cartItems` que guarda os itens do carrinho
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Função para remover do carrinho
  const removeFromCart = (productId, removeAll = false) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item._id === productId);
      if (item && item.quantity > 1 && !removeAll) {
        return prevItems.map((i) =>
          i._id === productId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        return prevItems.filter((i) => i._id !== productId);
      }
    });
  };

  // Passando `cartItems` junto com as funções no Provider
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
