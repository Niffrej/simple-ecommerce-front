import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider, useCart } from './contexts/CartContext';
import './styles/index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false); // Controle para mostrar a aba "Ver Carrinho"
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    fetch('https://simple-ecommerce-p704.onrender.com/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const addToCart = (product) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios.post('https://simple-ecommerce-p704.onrender.com/api/cart/add', { productId: product._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
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
      })
      .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
    } else {
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
    }
  };

  const closeCart = () => {
    setShowCart(false); // Fecha a aba "Ver Carrinho"
  };

  const openCart = () => {
    setShowCart(true); // Abre a aba "Ver Carrinho"
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header openCart={openCart} />

      <main className="container mx-auto py-6">
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        <ProductList products={products} addToCart={addToCart} />
      </main>

      {showCart && ( // Verifica se a aba "Ver Carrinho" está aberta
        <div className="cart-modal">
          <Cart onClose={closeCart} />
        </div>
      )}

      <footer className="bg-blue-600 text-white p-4 mt-6">
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
