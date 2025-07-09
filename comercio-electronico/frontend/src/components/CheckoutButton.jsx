import { useCart } from '../hooks/useCart';
import axios from 'axios';

const CheckoutButton = () => {
  const { items, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      const orderData = {
        products: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
      };

      await axios.post('/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('¡Compra realizada con éxito!');
      clearCart();
    } catch (error) {
      console.error('Error en la compra:', error);
      alert('Ocurrió un error al finalizar la compra.');
    }
  };

  return (
    <button onClick={handleCheckout} disabled={items.length === 0}>
      Finalizar compra
    </button>
  );
};

export default CheckoutButton;
