// backend/src/app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes.js';
import dashboardRouter from './routes/dashboardRouter.js';
import morgan from 'morgan' ;
app.use(morgan('dev'))

dotenv.config();  // Carga las variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/dashboard', dashboardRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente!');
});

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
