// src/api.js

// Detecta si está corriendo dentro de Docker o localmente
const API_URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? import.meta.env.VITE_API_URL || 'http://localhost:3000/api'  // desarrollo local
    : 'http://backend:3000/api';                                     // dentro de Docker, usa el nombre del servicio

/**
 * Función genérica para hacer fetch a la API
 * @param {string} endpoint - Ruta de la API (ej: '/public/catalog')
 * @param {object} options - Opciones de fetch (method, body, headers, etc)
 * @returns {Promise<any>} - Respuesta JSON o texto
 */
export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

    if (!res.ok) {
      // Redirigir al login si no autorizado
      if (res.status === 401 || res.status === 403) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }

      const errText = await res.text();
      throw new Error(errText || `Error en la petición: ${res.status}`);
    }

    // Detecta si la respuesta es JSON o texto
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (error) {
    // Error de red o CORS
    console.error('Error en la petición API:', error);
    throw new Error(error.message || 'Error de red');
  }
}
