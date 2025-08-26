import React, { useState } from 'react';
import {
  FaRegNewspaper,
  FaHeading,
  FaAlignLeft,
  FaImage
} from 'react-icons/fa';

const NewsForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim().length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres';
    }

    if (!formData.description || formData.description.trim().length < 100) {
      newErrors.description = 'La descripción debe tener al menos 100 caracteres';
    }

    // ❌ Eliminada la validación de URL de imagen
    // ahora cualquier valor (o vacío) es válido
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
      await onSubmit({
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl
      });

      setFormData({
        title: '',
        description: '',
        imageUrl: ''
      });
      setErrors({});
      onClose();
    } catch (error) {
      alert('Error al crear la noticia: ' + (error.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        <FaRegNewspaper /> Crear Noticia
      </h2>

      <form onSubmit={handleSubmit} className="border p-4 shadow rounded bg-light">

        {/* Título */}
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

        {/* Descripción */}
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

        {/* Imagen */}
        <div className="mb-3">
          <label className="form-label"><FaImage /> URL de Imagen (opcional)</label>
          <input
            type="text" // puedes usar 'url' o 'text', ambos funcionan
            className="form-control"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Opcional: https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Publicando...' : 'Publicar Noticia'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default NewsForm;
