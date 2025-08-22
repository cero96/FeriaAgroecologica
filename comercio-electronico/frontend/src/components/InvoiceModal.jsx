// src/components/InvoiceModal.js

import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { FaCheckCircle, FaTruck, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importamos para redirigir

export default function InvoiceModal({ invoice, show, onHide }) {
  const [cliente, setCliente] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
  });

  const navigate = useNavigate(); // Hook de redirección

  const handleSendWhatsApp = () => {
    // Validamos que todos los campos estén llenos
    if (!cliente.nombre || !cliente.cedula || !cliente.direccion) {
      alert("Por favor complete los datos del cliente antes de enviar.");
      return;
    }

    // Construimos el mensaje de WhatsApp sin emojis
    const mensaje = `
Nota de Venta #${invoice?.id}
Cliente: ${cliente.nombre}
Cédula: ${cliente.cedula}
Dirección: ${cliente.direccion}
Fecha: ${new Date(invoice?.id).toLocaleDateString()}

Productos:
${invoice.items
      .map(
        (item) =>
          `• ${item.name} (x${item.quantity}) - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n")}

Total: $${invoice.total.toFixed(2)}
Entrega: Retiro en feria o delivery (a coordinar)
`;

    const telefono = "593979078578";
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank"); // Abrimos WhatsApp en nueva pestaña

    navigate("/"); // Redirigimos al inicio si todo salió bien
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="invoice-modal">
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between w-100">
          <div>
            <h4 className="modal-title">Nota de Venta #{invoice?.id}</h4>
            <p className="mb-0 text-muted">
              Fecha: {new Date(invoice?.id).toLocaleDateString()}
            </p>
          </div>
          <div>
            <FaTruck size={30} />
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        {invoice ? (
          <div className="row">
            {/* Columna izquierda: Formulario de cliente */}
            <div className="col-md-5">
              <h5>Datos del Cliente</h5>

              {/* Campo: Nombre */}
              <Form.Group className="mb-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={20}
                  value={cliente.nombre}
                  onChange={(e) => {
                    const valor = e.target.value;
                    const valido = /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]*$/.test(valor);
                    if (!valido) {
                      alert("Solo se permiten letras y espacios en el nombre.");
                      return;
                    }
                    setCliente({ ...cliente, nombre: valor });
                  }}
                />
              </Form.Group>

              {/* Campo: Cédula */}
              <Form.Group className="mb-2">
                <Form.Label>Cédula</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={10}
                  value={cliente.cedula}
                  onChange={(e) => {
                    const valor = e.target.value;
                    const soloNumeros = valor.replace(/\D/g, "");
                    if (valor !== soloNumeros) {
                      alert("Solo se permiten números en la cédula.");
                      return;
                    }
                    setCliente({ ...cliente, cedula: soloNumeros });
                  }}
                />
              </Form.Group>

              {/* Campo: Dirección */}
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  maxLength={200}
                  value={cliente.direccion}
                  onChange={(e) =>
                    setCliente({ ...cliente, direccion: e.target.value })
                  }
                />
              </Form.Group>

              {/* Botón de WhatsApp */}
              <Button
                variant="success"
                className="w-100"
                onClick={handleSendWhatsApp}
              >
                <FaWhatsapp className="me-2" />
                Enviar por WhatsApp
              </Button>
            </div>

            {/* Columna derecha: Factura */}
            <div className="col-md-7">
              <div className="invoice-header mb-3">
                <h5 className="text-uppercase">Feria Agroecológica La Floresta</h5>
                <p className="text-muted mb-1">
                  Calle Galavis 237, Quito 170143 <br />
                  Tel: 097 907 8578 <br />
                  contacto@empresa.com
                </p>
              </div>

              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="fw-bold">
                    <td colSpan={3} className="text-end">
                      Total:
                    </td>
                    <td>${invoice.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>

              <div className="d-flex justify-content-between">
                <span>
                  <FaCheckCircle color="green" size={20} className="me-1" />
                  Compra Exitosa
                </span>
                <span className="text-muted">Método de pago: A convenir</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Cargando factura...</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} className="fw-bold">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
