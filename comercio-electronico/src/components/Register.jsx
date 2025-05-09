import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Form, Button, Container, Card } from 'react-bootstrap';
import './Auth.css';

function Register() {
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Datos de registro:', formData);
  };

  return (
    <div className="auth-background">
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Registro de Usuario</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>ID de Usuario</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu ID" value={formData.userId} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" placeholder="Ingresa tu teléfono" value={formData.phone} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Ingresa tu contraseña" value={formData.password} onChange={handleChange} required />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
          <p className="text-center mt-3">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </p>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
