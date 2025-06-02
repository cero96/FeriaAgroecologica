const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(API_URL + endpoint, { ...options, headers });

  if (!res.ok) {
    if (res.status === 403 || res.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }

    const errText = await res.text();
    throw new Error(errText || 'Error en la petición');
  }

  return res.json();
}
