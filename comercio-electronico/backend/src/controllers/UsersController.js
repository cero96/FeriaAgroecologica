// backend/src/controllers/UsersController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Simulación temporal de base de datos
let usersDB = [];

export const register = async (req, res) => {
  const { userId, name, email, phone, password } = req.body;

  const existingUser = usersDB.find(u => u.userId === userId);
  if (existingUser) {
    return res.status(409).json({ message: 'El usuario ya existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    userId,
    name,
    email,
    phone,
    password: hashedPassword,
    role: 'user'
  };

  usersDB.push(newUser);
  res.status(201).json({ message: 'Usuario registrado correctamente' });
};

export const login = async (req, res) => {
  const { userId, password } = req.body;

  const user = usersDB.find(u => u.userId === userId);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'Inicio de sesión exitoso',
    token,
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
