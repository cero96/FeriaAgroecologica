// src/components/BlogCrud.jsx
import React, { useEffect, useState } from 'react';

const BlogCrud = ({ currentUserId }) => {
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
      const res = await fetch('http://localhost:3000/api/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error cargando historias');
      const data = await res.json();
      const userBlogs = data.filter(b => b.userId === currentUserId);
      setBlogs(userBlogs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta historia?')) return;
    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
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
    const imageUrl = form.imageUrl.value; // sin restricción

    if (!title || !description) {
      alert('Título y descripción son obligatorios');
      return;
    }

    try {
      const method = editingBlog ? 'PUT' : 'POST';
      const url = editingBlog
        ? `http://localhost:3000/api/blogs/${editingBlog.id}`
        : 'http://localhost:3000/api/blogs';

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
        setBlogs([savedBlog, ...blogs]);
      }

      closeForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {loading && <p>Cargando historias...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row g-3">
        {blogs.map(blog => (
          <div key={blog.id} className="col-12 col-md-6">
            <div className="card h-100">
              {blog.imageUrl && <img src={blog.imageUrl} className="card-img-top" alt={blog.title} />}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text text-truncate" style={{ maxHeight: '4.5em' }}>{blog.description}</p>
                <div className="mt-auto d-flex justify-content-end gap-2">
                  <button className="btn btn-sm btn-info" onClick={() => setViewBlog(blog)}>Ver</button>
                  <button className="btn btn-sm btn-warning" onClick={() => openForm(blog)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(blog.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && !loading && (
          <p className="text-center text-muted mt-3">No hay historias disponibles.</p>
        )}
      </div>

      {/* Modal Crear/Editar */}
      {showForm && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{editingBlog ? 'Editar Historia' : 'Crear Historia'}</h5>
                <button type="button" className="btn-close" onClick={closeForm}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título</label>
                  <input type="text" id="title" name="title" className="form-control" defaultValue={editingBlog?.title || ''} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción</label>
                  <textarea id="description" name="description" className="form-control" rows={4} defaultValue={editingBlog?.description || ''} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">URL de la Imagen</label>
                  <input type="text" id="imageUrl" name="imageUrl" className="form-control" defaultValue={editingBlog?.imageUrl || ''} />
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

      {/* Modal Ver Blog */}
      {viewBlog && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{viewBlog.title}</h5>
                <button type="button" className="btn-close" onClick={() => setViewBlog(null)}></button>
              </div>
              <div className="modal-body">
                {viewBlog.imageUrl && <img src={viewBlog.imageUrl} className="img-fluid mb-3 rounded" alt={viewBlog.title} />}
                <p style={{ whiteSpace: 'pre-wrap' }}>{viewBlog.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setViewBlog(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCrud;
