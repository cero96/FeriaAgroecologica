import React, { useEffect, useState } from 'react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api') + '/blogs';

const BlogCrud = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewBlog, setViewBlog] = useState(null);

  const token = localStorage.getItem('token');

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        let msg = 'Error cargando historias';
        try {
          const errData = await res.json();
          msg = errData.message || msg;
        } catch {}
        throw new Error(msg);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        let errMsg = 'Error al eliminar';
        try {
          const errData = await res.json();
          errMsg = errData.error || errData.message || errMsg;
        } catch {}
        throw new Error(errMsg);
      }
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  const openForm = (blog = null) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingBlog(null);
    setShowForm(false);
  };

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
        let errMsg = 'Error guardando la historia';
        try {
          const errData = await res.json();
          errMsg = errData.error || errData.message || errMsg;
        } catch {}
        throw new Error(errMsg);
      }

      const savedBlog = await res.json();

      setBlogs((prevBlogs) =>
        editingBlog
          ? prevBlogs.map((b) => (b.id === savedBlog.id ? savedBlog : b))
          : [...prevBlogs, savedBlog]
      );

      closeForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center" style={{ color: '#4b0082' }}>
        Gestión de Historias
      </h2>

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={() => openForm()}>
          Crear nueva historia
        </button>
      </div>

      {loading && <p className="text-center">Cargando historias...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
        <table className="table table-hover shadow-sm rounded" style={{ background: 'white' }}>
          <thead>
            <tr>
              <th>Título</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center text-muted">
                  No hay historias disponibles.
                </td>
              </tr>
            )}
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-info me-2"
                    onClick={() => setViewBlog(blog)}
                  >
                    Ver
                  </button>
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => openForm(blog)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL FORM */}
      {showForm && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <form
              className="modal-content"
              onSubmit={handleSubmit}
              style={{
                background: 'linear-gradient(135deg, #ffffff, #f3f3f3)',
                borderRadius: '15px',
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">{editingBlog ? 'Editar Historia' : 'Crear Historia'}</h5>
                <button type="button" className="btn-close" onClick={closeForm}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
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
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
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
                  <label htmlFor="imageUrl" className="form-label">
                    URL de la Imagen
                  </label>
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
                <button type="button" className="btn btn-outline-secondary" onClick={closeForm}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL VIEW */}
      {viewBlog && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div
              className="modal-content"
              style={{
                background: 'linear-gradient(135deg, #ffffff, #f3f3f3)',
                borderRadius: '15px',
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">{viewBlog.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewBlog(null)}
                ></button>
              </div>
              <div className="modal-body">
                {viewBlog.imageUrl && (
                  <img
                    src={viewBlog.imageUrl}
                    alt={viewBlog.title}
                    className="img-fluid mb-3 rounded"
                    style={{ borderRadius: '10px' }}
                  />
                )}
                <p style={{ whiteSpace: 'pre-wrap', color: '#444' }}>{viewBlog.description}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setViewBlog(null)}>
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
