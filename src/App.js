import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import './styles/index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('https://simple-ecommerce-p704.onrender.com/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const addToCart = (product) => {
    setShowCart(true); // Mostra o carrinho quando um item é adicionado
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />

        <main className="container mx-auto py-6">
          <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
          <ProductList products={products} addToCart={addToCart} />
        </main>

        {showCart && <Cart onClose={closeCart} />}

        <footer className="bg-blue-600 text-white p-4 mt-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 E-Commerce. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
