// src/components/InvoiceModal.js

import React from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { FaCheckCircle, FaTruck } from "react-icons/fa";  // Importar iconos de react-icons

export default function InvoiceModal({ invoice, show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg" className="invoice-modal">
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between w-100">
          <div>
            <h4 className="modal-title">Factura #{invoice?.id}</h4>
            <p className="mb-0 text-muted">Fecha: {new Date(invoice?.id).toLocaleDateString()}</p>
          </div>
          <div>
            <FaTruck size={30} />
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        {invoice ? (
          <>
            {/* Información de la empresa */}
            <div className="invoice-header mb-4">
              <h5 className="text-uppercase">Factura de compra</h5>
              <p className="text-muted mb-0">
                <strong>Empresa XYZ</strong><br />
                Calle Ficticia 123, Ciudad, País<br />
                Teléfono: (123) 456-7890<br />
                Email: contacto@empresa.com
              </p>
            </div>

            {/* Tabla de productos */}
            <Table bordered hover responsive className="invoice-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
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
                  <td colSpan={3} className="text-end">Total:</td>
                  <td>${invoice.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>

            {/* Estado de la compra */}
            <div className="d-flex justify-content-between">
              <div>
                <FaCheckCircle color="green" size={25} /> Compra Exitosa
              </div>
              <div className="text-end">
                <p className="text-muted">Método de pago: Tarjeta de Crédito</p>
              </div>
            </div>
          </>
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
