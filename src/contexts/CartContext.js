import React, { createContext, useContext, useState } from 'react';

// Criação do contexto
export const CartContext = createContext();

// Custom hook para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

// Provedor do contexto
export const CartProvider = ({ children }) => {
  // Estado do carrinho
  const [ setCartItems] = useState([]);

  // Função para adicionar ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        // Atualizar a quantidade se o item já existir no carrinho
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Adicionar o produto ao carrinho se não existir
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Função para remover do carrinho
  const removeFromCart = (productId, removeAll = false) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item._id === productId);
      if (item && item.quantity > 1 && !removeAll) {
        // Diminuir a quantidade se houver mais de uma unidade
        return prevItems.map((i) =>
          i._id === productId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        // Remover completamente o item se restar apenas uma unidade ou remover tudo
        return prevItems.filter((i) => i._id !== productId);
      }
    });
  };

  return (
    <CartContext.Provider value={{ setCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
