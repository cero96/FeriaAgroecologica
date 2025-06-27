import React from "react";
import { useCart } from "../context/CartContext";
import { Button } from "react-bootstrap";

// Este es el componente ProductCard
const ProductCard = ({ product, onOpenModal }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (quantity) => {
    if (quantity <= 0 || quantity > product.quantityAvailable) return;
    addToCart({ ...product, quantity });
  };

  return (
    <div className="col-md-4 mb-4" key={product.id}>
      <div className="card h-100">
        {product.photoUrl && (
          <img
            src={product.photoUrl}
            className="card-img-top"
            alt={product.name}
            style={{ objectFit: "cover", height: "200px" }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text text-truncate">{product.description}</p>
          <p><strong>Disponibles:</strong> {product.quantityAvailable}</p>
          <p><strong>Contacto:</strong> {product.user.name} ({product.user.phone})</p>
          <p><strong>Tienda:</strong> {product.tenantName || "Feria la Floresta"}</p>
          {/* Eliminar el botón de WhatsApp */}
          {/* <a
            href={`https://wa.me/${product.contactNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-success mb-2"
          >
            Contactar por WhatsApp
          </a> */}
          <button
            className="btn btn-sm btn-primary mt-auto"
            onClick={() => onOpenModal(product)}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
