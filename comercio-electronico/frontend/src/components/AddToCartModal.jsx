import React, { useState } from 'react';

export default function AddToCartModal({ product, onConfirm, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity > 0 && quantity <= product.quantityAvailable) {
      onConfirm(quantity);
      onClose();
    } else {
      alert(`Debes ingresar una cantidad válida (1 - ${product.quantityAvailable})`);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar al carrito</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>{product.name}</strong></p>
            <p>Stock disponible: {product.quantityAvailable}</p>
            <input
              type="number"
              className="form-control"
              value={quantity}
              min={1}
              max={product.quantityAvailable}
              onChange={e => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleAdd}>Agregar</button>
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
