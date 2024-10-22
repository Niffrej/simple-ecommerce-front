import React from 'react';

function Header({ openCart }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-Commerce</h1>
        <button 
          onClick={openCart} 
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          Ver Carrinho
        </button>
      </div>
    </header>
  );
}

export default Header;
