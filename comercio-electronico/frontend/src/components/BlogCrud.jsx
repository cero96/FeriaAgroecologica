import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/blogs';

const BlogCrud = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewBlog, setViewBlog] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error cargando historias');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta historia?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al eliminar');
      }
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  // Open edit/create form
  const openForm = (blog = null) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setEditingBlog(null);
    setShowForm(false);
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const imageUrl = form.imageUrl.value.trim();

    if (!title || !description) {
      alert('Título y descripción son obligatorios');
      return;
    }

    try {
      const method = editingBlog ? 'PUT' : 'POST';
      const url = editingBlog ? `${API_URL}/${editingBlog.id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, imageUrl }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error guardando la historia');
      }

      const savedBlog = await res.json();

      if (editingBlog) {
        setBlogs(blogs.map(b => (b.id === savedBlog.id ? savedBlog : b)));
      } else {
        setBlogs([...blogs, savedBlog]);
      }

      closeForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container p-3">
      <h2 className="mb-3">Gestión de Historias</h2>


      {loading && <p>Cargando historias...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Título</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => setViewBlog(blog)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => openForm(blog)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center text-muted">
                  No hay historias disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal para Crear/Editar */}
      {showForm && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{editingBlog ? 'Editar Historia' : 'Crear Historia'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeForm}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    defaultValue={editingBlog?.title || ''}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows={4}
                    defaultValue={editingBlog?.description || ''}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">URL de la Imagen</label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    className="form-control"
                    defaultValue={editingBlog?.imageUrl || ''}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeForm}>Cancelar</button>
                <button type="submit" className="btn btn-success">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Ver Blog */}
      {viewBlog && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{viewBlog.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewBlog(null)}
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                {viewBlog.imageUrl && (
                  <img
                    src={viewBlog.imageUrl}
                    alt={viewBlog.title}
                    className="img-fluid mb-3 rounded"
                  />
                )}
                <p style={{ whiteSpace: 'pre-wrap' }}>{viewBlog.description}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewBlog(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCrud;
