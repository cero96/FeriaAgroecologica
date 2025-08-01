import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Particule from '../components/Particule.jsx'; // Ajusta la ruta según tu estructura

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage('Por favor complete todos los campos');
      return;
    }

    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + '/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('tenantId', data.tenantId);
        localStorage.setItem('userId', data.userId);
        setMessage('Inicio de sesión exitoso');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setMessage('Error al conectar con el servidor');
      console.error(err);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Particule />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
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
            />
            <button
              type="submit"
              className="btn btn-success w-100"
              style={{ borderColor: '#2e7d32' }}
            >
              Iniciar sesión
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
