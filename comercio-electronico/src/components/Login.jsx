import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Datos de inicio de sesión:', formData);
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
