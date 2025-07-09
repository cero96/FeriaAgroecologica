import React, { useEffect, useState } from 'react';

export default function ProductForm({ onSubmit, onClose, product }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    photoUrl: '',
    quantityAvailable: '',
    contactNumber: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        photoUrl: product.photoUrl || '',
        quantityAvailable: product.quantityAvailable || '',
        contactNumber: product.contactNumber || '',
      });
    }
  }, [product]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.quantityAvailable) {
      alert('Nombre y cantidad son obligatorios');
      return;
    }

    onSubmit({
      ...form,
      quantityAvailable: Number(form.quantityAvailable),
    });
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" role="document">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">{product ? 'Editar Producto' : 'Nuevo Producto'}</h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
            <textarea
              name="description"
              className="form-control mb-2"
              placeholder="Descripción"
              value={form.description}
              onChange={handleChange}
              rows={2}
            />
            <input
              type="url"
              name="photoUrl"
              className="form-control mb-2"
              placeholder="URL de foto"
              value={form.photoUrl}
              onChange={handleChange}
            />
            <input
              type="number"
              name="quantityAvailable"
              className="form-control mb-2"
              placeholder="Cantidad Disponible"
              value={form.quantityAvailable}
              onChange={handleChange}
              required
              min={0}
            />
            <input
              type="text"
              name="contactNumber"
              className="form-control"
              placeholder="Teléfono de contacto"
              value={form.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-success">{product ? 'Actualizar' : 'Crear'}</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
