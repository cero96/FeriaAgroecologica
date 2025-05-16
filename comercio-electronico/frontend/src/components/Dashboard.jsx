import { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer una petición para obtener datos del usuario usando el token
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setUser(data.user))
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Bienvenido al Panel</h1>
      {user && <p>Hola, {user.name} 👋</p>}
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
