import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { BsX } from "react-icons/bs";

export default function AddToCartModal({ product, onConfirm, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [currentStock, setCurrentStock] = useState(product.quantityAvailable);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuantity(1);
    setError("");
    setCurrentStock(product.quantityAvailable);
    inputRef.current?.focus();
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (quantity >= 1 && quantity <= currentStock) {
      const newStock = currentStock - quantity;
      setCurrentStock(newStock);
      onConfirm({ ...product, quantity: Number(quantity) });
      onClose();
    } else {
      setError(`Ingrese una cantidad válida (1 - ${currentStock})`);
    }
  };

  const handleQuantityChange = (e) => {
    const val = Number(e.target.value);
    setQuantity(val);
    if (val < 1 || val > currentStock) {
      setError(`Ingrese una cantidad válida (1 - ${currentStock})`);
    } else {
      setError("");
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
          Stock disponible: <strong>{currentStock}</strong>
        </p>

        <Form.Group controlId="quantity-input" className="text-start mt-3">
          <Form.Label>Cantidad a agregar:</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={currentStock}
            value={quantity}
            ref={inputRef}
            onChange={handleQuantityChange}
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={handleAdd} disabled={!!error}>
          Agregar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
