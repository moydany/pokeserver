import 'reflect-metadata';
import express from 'express';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import pokemonRoutes from './routes/pokemonRoutes';
import { container } from './inversify.config';
import { setupSwagger } from './swagger';
import logger from './config/logger';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const dbUri = 'mongodb://mongo:27017/myDB';
connectDatabase(dbUri)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => {
    logger.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);

// Configurar Swagger
setupSwagger(app);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export { app };
