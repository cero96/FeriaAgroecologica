import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import NewsForm from '../components/NewsForm';
import { apiFetch } from '../services/api';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar productos
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch('/products');
      setProducts(data);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = () => {
    setEditingProduct(null);
    setShowNewsForm(false);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowNewsForm(false);
    setShowForm(true);
  };

  const handleCreateNews = () => {
    setShowForm(false);
    setShowNewsForm(true);
    const modal = new bootstrap.Modal(document.getElementById('newsModal'));
    modal.show();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return;

    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert('Error al eliminar producto');
      console.error(err);
    }
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (editingProduct) {
        const updated = await apiFetch(`/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
        setProducts(products.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await apiFetch('/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        });
        setProducts([...products, created]);
      }
      setShowForm(false);
    } catch (err) {
      alert('Error al guardar producto');
      console.error(err);
    }
  };

  const handleNewsFormSubmit = async (newsData) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tenantId: Number(newsData.tenantId),
          userId: Number(newsData.userId),
          title: newsData.title,
          description: newsData.description,
          imageUrl: newsData.imageUrl || null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error desconocido');
      }

      alert('Noticia creada correctamente');
      setShowNewsForm(false);
      const modal = bootstrap.Modal.getInstance(document.getElementById('newsModal'));
      modal.hide();
    } catch (error) {
      alert('Error al crear la noticia: ' + (error.message || error));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dashboard de Productos</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-primary" onClick={handleCreate}>Nuevo Producto</button>
        <button className="btn btn-secondary" onClick={handleCreateNews}>Crear Historia</button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {products.length === 0 && !loading && <p>No hay productos.</p>}
        {products.map((p) => (
          <div key={p.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              {p.photoUrl && (
                <img
                  src={p.photoUrl}
                  className="card-img-top"
                  alt={p.name}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text flex-grow-1">{p.description}</p>
                <p><b>Cantidad:</b> {p.quantityAvailable}</p>
                <p><b>Contacto:</b> {p.contactNumber || '-'}</p>
                <div className="d-flex justify-content-between mt-auto">
                  <button className="btn btn-sm btn-outline-success" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario productos */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Modal para NewsForm */}
      <div className="modal fade" id="newsModal" tabIndex="-1" aria-labelledby="newsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newsModalLabel">Crear Historia</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              {showNewsForm && (
                <NewsForm
                  onSubmit={handleNewsFormSubmit}
                  onClose={() => {
                    setShowNewsForm(false);
                    const modal = bootstrap.Modal.getInstance(document.getElementById('newsModal'));
                    modal.hide();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
