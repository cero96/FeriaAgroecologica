import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particule from '../components/Particule.jsx'; // Ajusta la ruta según tu estructura

export default function Register() {
  const [form, setForm] = useState({
    tenantName: '',
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.tenantName || !form.name || !form.email || !form.password) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName: form.tenantName,
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: 'admin',
        }),
      });

      if (res.ok) {
        navigate('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error del servidor. Intente más tarde.');
      console.error(err);
    }
  };

  return (
    <>
      <Particule />
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card p-4 shadow" style={{ maxWidth: '450px', borderRadius: '12px', borderColor: '#4caf50' }}>
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
                autoFocus
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
              />
            </div>
            <button type="submit" className="btn btn-success w-100" style={{ borderColor: '#388e3c' }}>
              Registrarse
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
