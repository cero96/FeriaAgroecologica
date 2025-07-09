// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext'; // 👈 Importa el provider

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

