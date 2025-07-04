// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <div className="container text-center mt-5">
              <h1>Bienvenido al Panel</h1>
              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
