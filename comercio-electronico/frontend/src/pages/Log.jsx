import React, { useState } from 'react';
import { FaRegNewspaper, FaUser, FaHeading, FaAlignLeft, FaImage } from 'react-icons/fa';
import '../styles/Log.css';

const Log = () => {
  const [formData, setFormData] = useState({
    tenantId: '',
    userId: '',
    title: '',
    description: '',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});

  // Validaciones idénticas a las de NewsForm
  const validate = (data) => {
    const newErrors = {};
    if (!data.tenantId || isNaN(data.tenantId) || data.tenantId <= 0) {
      newErrors.tenantId = 'Debe ser un número positivo';
    }
    if (!data.userId || isNaN(data.userId) || data.userId <= 0) {
      newErrors.userId = 'Debe ser un número positivo';
    }
    if (!data.title || data.title.trim().length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres';
    }
    if (!data.description || data.description.trim().length < 100) {
      newErrors.description = 'La descripción debe tener al menos 100 caracteres';
    }
    if (data.imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(data.imageUrl)) {
      newErrors.imageUrl = 'Debe ser una URL válida de imagen';
    }
    return newErrors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);
    setErrors(validate(next));   // actualización en tiempo real
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert('Noticia creada correctamente');
      // Aquí enviarías formData al backend
    }
  };

  return (
    <div className="container my-5 log-page">
      <div className="row g-4">
        {/* === COLUMNA 1: FORMULARIO === */}
        <div className="col-lg-6">
          <h2 className="mb-4 text-center text-lg-start"><FaRegNewspaper /> Crear Noticia</h2>
          <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">

            {/* Tenant ID */}
            <div className="mb-3">
              <label className="form-label"><FaUser /> Tenant ID</label>
              <input
                type="number"
                name="tenantId"
                value={formData.tenantId}
                onChange={handleChange}
                className={`form-control ${errors.tenantId ? 'is-invalid' : ''}`}
              />
              {errors.tenantId && <div className="invalid-feedback">{errors.tenantId}</div>}
            </div>

            {/* User ID */}
            <div className="mb-3">
              <label className="form-label"><FaUser /> User ID</label>
              <input
                type="number"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
              />
              {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
            </div>

            {/* Título */}
            <div className="mb-3">
              <label className="form-label"><FaHeading /> Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label"><FaAlignLeft /> Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            {/* Image URL */}
            <div className="mb-3">
              <label className="form-label"><FaImage /> URL de Imagen (opcional)</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
              />
              {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Publicar Noticia
            </button>
          </form>
        </div>

        {/* === COLUMNA 2: PREVIEW === */}
        <div className="col-lg-6">
          <div className="row align-items-center shadow-lg rounded p-3 bg-white log-preview">
            <div className="col-12 mb-3 log-image-wrapper">
              <img
                src={formData.imageUrl || 'https://via.placeholder.com/800x600?text=Imagen+Noticia'}
                alt="Preview"
                className="img-fluid rounded log-image"
              />
            </div>
            <div className="col-12 text-center text-lg-start">
              <h2 className="log-title">{formData.title || 'Título de la Noticia'}</h2>
              <p className="log-description">{formData.description || 'Descripción de tu noticia aparecerá aquí.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
