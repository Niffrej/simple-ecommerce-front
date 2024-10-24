import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider, useCart } from './contexts/CartContext';
import './styles/index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false); 
  const { setCartItems } = useCart(); 

  useEffect(() => {
    fetch('https://simple-ecommerce-green.vercel.app/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const addToCart = (product) => {
    const token = localStorage.getItem('authToken');

    const addItemToCart = () => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item._id === product._id);
        if (existingItem) {
          return prevItems.map(item =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
      openCart(); 
    };

    if (token) {
      axios.post('https://simple-ecommerce-green.vercel.app/api/cart/add', { productId: product._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        addItemToCart(); 
      })
      .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
    } else {
      addItemToCart(); 
    }
  };

  const closeCart = () => {
    setShowCart(false); 
  };

  const openCart = () => {
    setShowCart(true); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header openCart={openCart} />

      <main className="flex-grow container mx-auto py-6">
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        <ProductList products={products} addToCart={addToCart} />
      </main>

      {showCart && ( 
        <div className="cart-modal">
          <Cart onClose={closeCart} />
        </div>
      )}

      <footer className="bg-blue-600 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 E-Commerce. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}
