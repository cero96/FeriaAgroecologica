const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  // Asegura que la URL no tenga barras sobrantes ni falten
  const url = API_URL.replace(/\/+$/, '') + '/' + endpoint.replace(/^\/+/, '');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (err) {
    throw new Error('No se pudo conectar con el servidor');
  }

  if (!response.ok) {
    // Manejo de sesión expirada o no autorizada
    if (response.status === 401 || response.status === 403) {
      localStorage.clear();

      // Evita bucles infinitos si ya estás en /login
      if (window.location.pathname !== '/login') {
        window.location.replace('/login'); // Redirige sin guardar historial
        setTimeout(() => window.location.reload(), 100); // Fuerza recarga
      }
      return;
    }

    // Obtener mensaje de error de forma segura
    let errorMessage = 'Error en la petición';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } catch {
      try {
        errorMessage = await response.text();
      } catch {
        // Ignorar si no se puede leer
      }
    }

    throw new Error(errorMessage);
  }

  // Intentar parsear respuesta como JSON
  try {
    return await response.json();
  } catch {
    return null; // Si no es JSON, devolver null
  }
}
