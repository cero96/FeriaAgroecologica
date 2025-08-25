import React, { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import BlogCrud from '../components/BlogCrud';
import ProductForm from '../components/ProductForm';
import NewsModal from '../components/NewsModal';
import DashboardHeader from '../components/DashboardHeader';
import DashboardActions from '../components/DashboardActions';
import ProductList from '../components/ProductList.jsx';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const currentUserId = user?.id;
  const tenantId = user?.tenantId;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    setErrorProducts('');
    try {
      const data = await apiFetch('/products');
      const filtered = data.filter(p => p.userId === currentUserId);
      setProducts(filtered);
    } catch (err) {
      console.error(err);
      setErrorProducts('Error al cargar productos');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
    setShowNewsForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    setShowNewsForm(false);
  };

  const handleCreateNews = () => {
    setShowForm(false);
    setShowNewsForm(true);
    setTimeout(() => {
      const modal = new window.bootstrap.Modal(document.getElementById('newsModal'));
      modal.show();
    }, 100);
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (editingProduct) {
        const updated = await apiFetch(`/products/${editingProduct.id}`, {
          method: 'PUT',
          body: JSON.stringify(productData),
        });
        setProducts(products.map(p => (p.id === updated.id ? updated : p)));
      } else {
        const created = await apiFetch('/products', {
          method: 'POST',
          body: JSON.stringify(productData),
        });
        setProducts([...products, created]);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Error al guardar producto');
    }
  };

  const handleNewsFormSubmit = async (newsData) => {
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      alert('Error: VITE_API_URL no está definido.');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tenantId,
          userId: currentUserId,
          title: newsData.title,
          description: newsData.description,
          imageUrl: newsData.imageUrl || null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error desconocido');
      }

      alert('Historia creada correctamente');
      const modal = window.bootstrap.Modal.getInstance(document.getElementById('newsModal'));
      modal.hide();
      setShowNewsForm(false);
    } catch (error) {
      console.error(error);
      alert('Error al crear la historia: ' + (error.message || error));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return;

    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar producto');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      <DashboardHeader onLogout={handleLogout} />
      <main className="container my-4 flex-grow-1">
        <DashboardActions onCreateProduct={handleCreate} onCreateNews={handleCreateNews} />

        {/* Panel dividido lado a lado */}
        <div className="row g-4">
          {/* Productos */}
          <div className="col-12 col-lg-6">
            <section className="d-flex flex-column bg-white rounded shadow-sm p-4" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <h3 className="mb-3 border-bottom pb-2 text-success">Mis Productos</h3>
              <ProductList
                products={products}
                loading={loadingProducts}
                error={errorProducts}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </section>
          </div>

          {/* Historias */}
          <div className="col-12 col-lg-6">
            <section className="d-flex flex-column bg-white rounded shadow-sm p-4" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <h3 className="mb-3 border-bottom pb-2 text-success">Mis Historias</h3>
              <BlogCrud />
            </section>
          </div>
        </div>
      </main>

      {/* Formularios */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      <NewsModal
        show={showNewsForm}
        onSubmit={handleNewsFormSubmit}
        onCancel={() => setShowNewsForm(false)}
      />
    </div>
  );
};

export default Dashboard;
