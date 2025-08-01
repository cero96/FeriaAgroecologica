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

      // Enviar la orden
      await axios.post('/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Reducir el stock de cada producto
      await Promise.all(items.map(async (item) => {
        await axios.put(`/api/products/${item.id}`, {
          quantityAvailable: item.quantityAvailable - item.quantity
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      }));

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
