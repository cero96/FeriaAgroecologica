// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí manejarías el registro con un API real
    localStorage.setItem('token', 'fake_token');
    navigate('/home');
  };

  return (
    <div className="register">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
