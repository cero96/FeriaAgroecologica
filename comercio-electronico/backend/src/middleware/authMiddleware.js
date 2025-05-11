// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Clave secreta (recomendado guardar en .env)
const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Formato esperado: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Agrega datos del usuario al request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;
