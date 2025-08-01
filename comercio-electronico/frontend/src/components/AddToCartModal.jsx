import React, { useEffect, useRef } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function AddToCartModal({ product, onConfirm, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (product.quantityAvailable >= 1) {
      // Siempre se agrega solo 1 unidad
      onConfirm({ ...product, quantity: 1 });
      onClose();
    } else {
      alert("🚫 Sin stock disponible");
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>Agregar al carrito</Modal.Title>
        <Button
          variant="light"
          onClick={onClose}
          className="ms-auto border-0"
          aria-label="Cerrar"
        >
          <BsX size={24} />
        </Button>
      </Modal.Header>

      <Modal.Body className="text-center">
        <Image
          src={product.photoUrl || product.imageUrl || ""}
          alt={product.name}
          rounded
          style={{
            width: 180,
            height: 180,
            objectFit: "cover",
            marginBottom: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <h5 className="fw-bold">{product.name}</h5>
        <p className="text-muted">
          Stock disponible: <strong>{product.quantityAvailable}</strong>
        </p>
        <p>¿Deseas agregar  al carrito?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleAdd}
          disabled={product.quantityAvailable < 1}
        >
          Agregar 
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
