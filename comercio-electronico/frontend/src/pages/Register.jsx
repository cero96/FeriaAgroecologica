import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particule from '../components/Particule.jsx'; // Ajusta si cambia tu estructura

export default function Register() {
  const [form, setForm] = useState({
    tenantName: '',
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { tenantName, name, email, password } = form;

    if (!tenantName || !name || !email || !password) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        throw new Error('VITE_API_URL no está definido en el entorno');
      }

      const res = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName: form.tenantName,
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: 'admin', // Fijo por ahora
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/login');
      } else {
        setError(data.message || data.error || 'Error al registrar usuario');
      }
    } catch (err) {
      console.error('Error en registro:', err);
      setError('Error del servidor. Intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Particule />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div
          className="card p-4 shadow"
          style={{
            maxWidth: '450px',
            borderRadius: '12px',
            borderColor: '#4caf50',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          }}
        >
          <h2 className="text-center mb-4" style={{ color: '#4caf50' }}>Registro</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="tenantName"
                className="form-control"
                placeholder="Nombre de la Empresa (Tenant)"
                value={form.tenantName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nombre completo"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="username"
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Teléfono (opcional)"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Contraseña (mín 6 caracteres)"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              style={{ borderColor: '#388e3c' }}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
