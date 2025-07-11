import React, { useState, useEffect, useRef } from 'react';

export default function AddToCartModal({ product, onConfirm, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [currentStock, setCurrentStock] = useState(product.quantityAvailable); // 🔥 Stock local
  const inputRef = useRef(null);

  useEffect(() => {
    setQuantity(1);
    setError('');
    setCurrentStock(product.quantityAvailable); // 🔥 Resetea stock al abrir modal
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    if (quantity >= 1 && quantity <= currentStock) {
      // 🔥 Actualiza stock local
      const newStock = currentStock - quantity;
      setCurrentStock(newStock);
      product.quantityAvailable = newStock; // ⚡️ También actualiza el stock del objeto producto

      // 👇 Llama al callback para agregar al carrito
      onConfirm(quantity);

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
      setError('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1050,
        padding: '1rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
        }}
      >
        {/* Header */}
        <header
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            id="modal-title"
            style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#333' }}
          >
            Agregar al carrito
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </header>

        {/* Body */}
        <section
          id="modal-desc"
          style={{
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <img
            src={product.photoUrl || product.imageUrl || ''}
            alt={product.name}
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <p
            style={{
              margin: '0',
              fontWeight: '700',
              fontSize: '1.1rem',
              color: '#222',
              textAlign: 'center',
            }}
          >
            {product.name}
          </p>
          <p style={{ margin: '0', color: '#555' }}>
            Stock disponible: <strong>{currentStock}</strong>
          </p>

          <label
            htmlFor="quantity-input"
            style={{ alignSelf: 'flex-start', fontWeight: '600', color: '#333' }}
          >
            Cantidad a agregar:
          </label>
          <input
            id="quantity-input"
            type="number"
            ref={inputRef}
            value={quantity}
            min={1}
            max={currentStock}
            onChange={handleQuantityChange}
            aria-invalid={!!error}
            aria-describedby={error ? 'quantity-error' : undefined}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              fontSize: '1rem',
              borderRadius: '6px',
              border: error ? '2px solid #dc3545' : '1px solid #ccc',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {error && (
            <p
              id="quantity-error"
              style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}
            >
              {error}
            </p>
          )}
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              border: '1px solid #6c757d',
              backgroundColor: '#fff',
              color: '#6c757d',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            Cancelar
          </button>
          <button
            onClick={handleAdd}
            disabled={!!error}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#28a745',
              color: '#fff',
              cursor: !!error ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!error) e.currentTarget.style.backgroundColor = '#218838';
            }}
            onMouseLeave={(e) => {
              if (!error) e.currentTarget.style.backgroundColor = '#28a745';
            }}
          >
            Agregar
          </button>
        </footer>
      </div>
    </div>
  );
}
