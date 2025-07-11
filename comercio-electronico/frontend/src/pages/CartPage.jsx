import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items: cart, setItems: setCart, removeFromCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoice, setInvoice] = useState(null);

  // Cambiar cantidad
  function handleQuantityChange(id, value) {
    const qty = parseInt(value, 10);
    if (isNaN(qty) || qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  }

  // Eliminar producto
  function handleRemove(id) {
    removeFromCart(id);
  }

  async function handleCheckout() {
    setLoading(true);
    setMessage("");
    try {
      const invoiceData = {
        invoiceId: Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleString(),
        items: cart,
        total,
      };

      setInvoice(invoiceData);
      setShowInvoice(true);
      setCart([]);
      setMessage("✅ Compra realizada con éxito!");
    } catch (error) {
      setMessage("❌ Error en la compra");
    }
    setLoading(false);
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 700 }}>
      <h2>🛒 Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-muted mt-3">El carrito está vacío.</p>
      ) : (
        <table className="table table-striped mt-3 align-middle">
          <thead className="table-dark">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ id, name, quantity, price }) => (
              <tr key={id}>
                <td>{name}</td>
                <td style={{ maxWidth: 100 }}>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(id, e.target.value)}
                  />
                </td>
                <td>${price.toFixed(2)}</td>
                <td>${(price * quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(id)}
                  >
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                Total:
              </td>
              <td className="fw-bold">${total.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}

      <button
        className="btn btn-success"
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
      >
        {loading ? "Procesando..." : "✅ Finalizar Compra"}
      </button>

      {message && <p className="mt-3">{message}</p>}

      {/* Modal Bootstrap para la factura */}
      {showInvoice && invoice && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  🧾 Factura #{invoice.invoiceId}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowInvoice(false)}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Fecha:</strong> {invoice.date}
                </p>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map(({ id, name, quantity, price }) => (
                      <tr key={id}>
                        <td>{name}</td>
                        <td>{quantity}</td>
                        <td>${price.toFixed(2)}</td>
                        <td>${(price * quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="text-end fw-bold">
                        Total:
                      </td>
                      <td className="fw-bold">${invoice.total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowInvoice(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
