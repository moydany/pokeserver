// src/app.ts
import 'reflect-metadata';
import express from 'express';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import pokemonRoutes from './routes/pokemonRoutes';
import healthRoutes from './routes/healthRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

app.use(express.json());

connectDatabase()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/', healthRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
