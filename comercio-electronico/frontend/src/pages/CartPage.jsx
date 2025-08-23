import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Table, Button, Form, Alert } from "react-bootstrap";
import InvoiceModal from "../components/InvoiceModal.jsx";
import Particule from "../components/Particule"; // Asegúrate de que la ruta sea correcta

export default function CartPage() {
  const { items: cart, setItems: setCart, removeFromCart, total } = useCart();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    const qty = Number(newQuantity);
    if (isNaN(qty) || qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");
    try {
      await new Promise((res) => setTimeout(res, 1000));

      const newInvoice = { id: Date.now(), items: [...cart], total };
      setInvoice(newInvoice);
      setShowInvoiceModal(true);
      setCart([]);
      setMessage("✅ Compra realizada exitosamente");
    } catch (error) {
      setMessage("❌ Error al realizar la compra");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !showInvoiceModal) {
    return (
      <>
        <Particule />
        {message && <Alert variant="info">{message}</Alert>}
        <Alert variant="info">El carrito está vacío.</Alert>
      </>
    );
  }

  return (
    <>
      <Particule />

      <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>
        <Table bordered hover responsive className="bg-white">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td style={{ maxWidth: 80 }}>
                  <Form.Control
                    type="number"
                    value={product.quantity}
                    min={1}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                  />
                </td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                Total:
              </td>
              <td colSpan={2} className="fw-bold">
                ${total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </Table>

        <Button
          variant="success"
          onClick={handleCheckout}
          disabled={loading}
          className="fw-bold"
        >
          {loading ? "Procesando..." : "Finalizar compra"}
        </Button>

        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </div>

      <InvoiceModal
        invoice={invoice}
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
      />
    </>
  );
}
