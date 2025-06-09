import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      const requestedQuantity = product.quantity;

      if (existing) {
        const newQuantity = existing.quantity + requestedQuantity;

        if (newQuantity > product.quantityAvailable) {
          alert(`Solo hay ${product.quantityAvailable} unidades disponibles`);
          return prev;
        }

        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      // Si es un producto nuevo en el carrito
      if (requestedQuantity > product.quantityAvailable) {
        alert(`Solo hay ${product.quantityAvailable} unidades disponibles`);
        return prev;
      }

      return [...prev, { ...product }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
