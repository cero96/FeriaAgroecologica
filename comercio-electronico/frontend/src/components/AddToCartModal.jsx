import React, { useEffect, useRef } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import Particule from "./Particule"; // Asegúrate que la ruta sea correcta

export default function AddToCartModal({ product, onConfirm, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (product.quantityAvailable >= 1) {
      onConfirm({ ...product, quantity: 1 });
      onClose();
    } else {
      alert("🚫 Sin stock disponible");
    }
  };

  return (
    <>
      <style>{`
        .custom-modal-content {
          background-image: 
            linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),
            url("https://img.freepik.com/vector-gratis/tecnologia-abstracta-fondo-verde_1035-17926.jpg?semt=ais_hybrid&w=740");
          background-size: cover;
          background-position: center;
          color: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .custom-modal-content .modal-header,
        .custom-modal-content .modal-body,
        .custom-modal-content .modal-footer {
          background-color: transparent;
        }

        .custom-modal-content .modal-title {
          color: white;
        }
      `}</style>

      <Particule />

      <Modal
        show
        onHide={onClose}
        centered
        style={{ zIndex: 1050 }}
        contentClassName="custom-modal-content"
      >
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
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          />
          <h5 className="fw-bold">{product.name}</h5>
          <p className="text-white-50">
            Precio: <strong>${parseFloat(product.price).toFixed(2)}</strong>
          </p>
          <p>¿Deseas agregar al carrito?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={onClose}>
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
    </>
  );
}
