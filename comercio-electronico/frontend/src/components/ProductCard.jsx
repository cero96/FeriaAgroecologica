// components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  if (!product) return null; // 👈 evita el error si product es undefined

  return (
    <div className="card shadow-sm">
      {product.photoUrl && (
        <img
          src={product.photoUrl}
          className="card-img-top"
          alt={product.name}
          style={{ maxHeight: '180px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{product.name}</h5>
        <p className="card-text flex-grow-1 text-secondary">{product.description}</p>
        <p className="mb-1"><strong>Cantidad:</strong> {product.quantityAvailable}</p>
        <p className="mb-3"><strong>Contacto:</strong> {product.contactNumber || '-'}</p>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary flex-grow-1"
            onClick={() => onEdit(product)}
          >
            Editar
          </button>
          <button
            className="btn btn-sm btn-outline-danger flex-grow-1"
            onClick={() => onDelete(product.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
