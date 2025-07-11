import React, { useState } from 'react';
import { FaRegNewspaper, FaUser, FaHeading, FaAlignLeft, FaImage } from 'react-icons/fa';

const NewsForm = () => {
  const [formData, setFormData] = useState({
    tenantId: '',
    userId: '',
    title: '',
    description: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.tenantId || isNaN(formData.tenantId) || formData.tenantId <= 0) {
      newErrors.tenantId = 'Debe ser un número positivo';
    }

    if (!formData.userId || isNaN(formData.userId) || formData.userId <= 0) {
      newErrors.userId = 'Debe ser un número positivo';
    }

    if (!formData.title || formData.title.trim().length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres';
    }

    if (!formData.description || formData.description.trim().length < 100) {
      newErrors.description = 'La descripción debe tener al menos 100 caracteres';
    }

    if (formData.imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Debe ser una URL válida de imagen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Formulario válido:', formData);
      // Aquí puedes enviar los datos al servidor con fetch/axios
      alert('Noticia creada correctamente');
    } else {
      console.warn('Errores en el formulario:', errors);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4"><FaRegNewspaper /> Crear Noticia</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">

        <div className="mb-3">
          <label className="form-label"><FaUser /> Tenant ID</label>
          <input
            type="number"
            className={`form-control ${errors.tenantId ? 'is-invalid' : ''}`}
            name="tenantId"
            value={formData.tenantId}
            onChange={handleChange}
            required
          />
          {errors.tenantId && <div className="invalid-feedback">{errors.tenantId}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label"><FaUser /> User ID</label>
          <input
            type="number"
            className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
          {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label"><FaHeading /> Título</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label"><FaAlignLeft /> Descripción</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label"><FaImage /> URL de Imagen (opcional)</label>
          <input
            type="url"
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Publicar Noticia
        </button>
      </form>
    </div>
  );
};

export default NewsForm;
