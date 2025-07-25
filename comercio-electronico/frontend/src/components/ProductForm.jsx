import React, { useEffect, useState } from 'react';

export default function ProductForm({ onSubmit, onClose, product }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    photoUrl: '',
    quantityAvailable: '',
    contactNumber: '',
    price: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        photoUrl: product.photoUrl || '',
        quantityAvailable: product.quantityAvailable || '',
        contactNumber: product.contactNumber || '',
        price: product.price || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    const errors = [];
    if (!form.name.trim()) errors.push('El nombre es obligatorio.');
    if (!form.description.trim()) errors.push('La descripción es obligatoria.');
    if (form.quantityAvailable === '' || isNaN(form.quantityAvailable) || Number(form.quantityAvailable) < 0)
      errors.push('La cantidad debe ser un número mayor o igual a 0.');
    if (!form.contactNumber.trim()) errors.push('El número de contacto es obligatorio.');
    if (form.price === '' || isNaN(form.price) || Number(form.price) <= 0)
      errors.push('El precio debe ser un número mayor que 0.');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    onSubmit({
      ...form,
      quantityAvailable: Number(form.quantityAvailable),
      price: Number(form.price),
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
              required
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
              type="number"
              step="0.01"
              name="price"
              className="form-control mb-2"
              placeholder="Precio"
              value={form.price}
              onChange={handleChange}
              required
              min={0.01}
            />
            <input
              type="text"
              name="contactNumber"
              className="form-control"
              placeholder="Teléfono de contacto"
              value={form.contactNumber}
              onChange={handleChange}
              required
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
