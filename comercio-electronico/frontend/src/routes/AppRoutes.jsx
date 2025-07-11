import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import CartPage from '../pages/CartPage';
import Productores from '../pages/Productores';
import Log from '../pages/Log';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productores" element={<Productores />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/blog" element={<Log />} />
       
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h2 className="text-center mt-5">Página no encontrada</h2>} />
    </Routes>
  );
}
