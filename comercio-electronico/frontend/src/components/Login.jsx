import { useState } from 'react'

import { Form, Button, Container, Card } from 'react-bootstrap';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Inicio de sesión exitoso', data);
        localStorage.setItem('token', data.token);
        // Redirigir o actualizar UI
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  

  return (
    <div className="auth-background">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>ID de Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu ID" value={formData.userId} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" value={formData.password} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar Sesión
            </Button>
          </Form>
          <p className="text-center mt-3">
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
