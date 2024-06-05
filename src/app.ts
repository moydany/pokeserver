import 'reflect-metadata';
import express from 'express';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import pokemonRoutes from './routes/pokemonRoutes';
import dotenv from 'dotenv';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

connectDatabase()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
