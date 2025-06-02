import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { apiFetch } from '../services/api';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
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
        // Editar
        const updated = await apiFetch(`/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
        setProducts(products.map(p => p.id === updated.id ? updated : p));
      } else {
        // Crear
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

      <button className="btn btn-primary mb-3" onClick={handleCreate}>Nuevo Producto</button>

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

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
