import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particule from '../components/Particule.jsx'; // Ajusta la ruta si es necesario

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        throw new Error('VITE_API_URL no está definido en el entorno');
      }

      const res = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Credenciales incorrectas');
        return;
      }

      // Guardar todos los datos relevantes
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data.userId,
        tenantId: data.tenantId,
        role: data.role,
        email: form.email,
      }));

      setMessage('Inicio de sesión exitoso');

      // Redirigir al dashboard después de un breve retraso
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (err) {
      console.error('Error de login:', err);
      setMessage('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Particule />

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}
      >
        <div
          className="card p-4 shadow"
          style={{
            maxWidth: '400px',
            borderRadius: '16px',
            border: '1px solid rgba(46, 125, 50, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
          }}
        >
          <h2 className="text-center mb-4" style={{ color: '#2e7d32' }}>
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="form-control mb-3"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              required
              disabled={loading}
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="form-control mb-3"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              disabled={loading}
            />

            <button
              type="submit"
              className="btn btn-success w-100"
              style={{ borderColor: '#2e7d32' }}
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>

          {message && (
            <div className="alert alert-warning mt-3" role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
