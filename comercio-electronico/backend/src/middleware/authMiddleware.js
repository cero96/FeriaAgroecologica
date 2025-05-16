// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret_key_feria_floresta'; // En producción usa process.env.JWT_SECRET

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica que venga el token con formato "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guarda los datos del usuario en el request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};
