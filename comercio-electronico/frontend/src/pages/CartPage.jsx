import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    // Aquí deberías hacer un POST a tu backend en /api/orders
    alert('Compra finalizada');
    clearCart();
  };

  return (
    <div className="container mt-4">
      <h2>Factura de Compra</h2>

      {cart.length === 0 ? (
        <p className="mt-3">Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" onClick={clearCart}>
              Vaciar Carrito
            </button>
            <button className="btn btn-success" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
