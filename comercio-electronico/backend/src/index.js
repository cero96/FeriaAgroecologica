import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/public/catalog', (req, res) => {
  res.json([{ id: 1, name: 'Producto 1', price: 10 }]);
});

// Escuchar en todas las interfaces para Docker
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});
