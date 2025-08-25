// Detecta el entorno y define la URL de la API
const API_URL = (() => {
  // Desarrollo local en navegador
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  }

  // Contenedores Docker (frontend → backend)
  if (window.location.hostname === 'frontend_app') {
    return 'http://backend:3000/api';
  }

  // Producción pública
  return import.meta.env.VITE_API_URL || 'http://158.23.80.110:3000/api';
})();

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
      if (res.status === 401 || res.status === 403) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }

      const errText = await res.text();
      throw new Error(errText || `Error en la petición: ${res.status}`);
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (error) {
    console.error('Error en la petición API:', error);
    throw new Error(error.message || 'Error de red');
  }
}
