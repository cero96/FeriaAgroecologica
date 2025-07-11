import React, { useState, useEffect } from 'react';
import { FaRegNewspaper, FaHeading, FaAlignLeft, FaImage } from 'react-icons/fa';

const NewsForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    tenantId: '',
    userId: '',
    title: '',
    description: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Obtener tenantId y userId desde localStorage al cargar
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData(prev => ({
        ...prev,
        tenantId: user.tenantId,
        userId: user.id
      }));
    }
  }, []);

  const validate = () => {
    const newErrors = {};

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await onSubmit(formData);
      setFormData({
        tenantId: '',
        userId: '',
        title: '',
        description: '',
        imageUrl: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      alert('Error al crear la noticia: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4"><FaRegNewspaper /> Crear Noticia</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">

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
          />
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

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Noticia'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
