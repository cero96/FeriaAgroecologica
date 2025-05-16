// src/components/Login.jsx
import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' o 'danger'

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessageType('danger');
      setMessage('❌ Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessageType('success');
        setMessage('✅ Inicio de sesión exitoso');
        setTimeout(() => {
          window.location.href = '/home';
        }, 1000);
      } else {
        setMessageType('danger');
        setMessage(`❌ ${data.message || 'Credenciales incorrectas'}`);
      }
    } catch (error) {
      console.error(error);
      setMessageType('danger');
      setMessage('❌ Error al conectar con el servidor');
    }
  };

  return (
<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
  <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%', borderRadius: '12px', borderColor: '#2e7d32' }}>
    <h2 className="text-center mb-4" style={{ color: '#2e7d32' }}>Iniciar Sesión</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </div>

      <div className="d-grid gap-2">
        <button
          type="submit"
          className="btn btn-success"
          style={{ backgroundColor: '#388e3c', borderColor: '#2e7d32' }}
        >
          Iniciar sesión
        </button>

        <a
          href="/register"
          className="btn btn-outline-success"
          style={{
            borderColor: '#66bb6a',
            color: '#2e7d32',
            backgroundColor: '#e8f5e9'
          }}
        >
          Registrarme
        </a>
      </div>
    </form>

    {message && (
      <div className={`alert mt-3 alert-${messageType}`} role="alert">
        {message}
      </div>
    )}
  </div>
</div>

  );
}

export default Login;
