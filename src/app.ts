import 'reflect-metadata';
import express from 'express';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const dbUri = 'mongodb://mongo:27017/myDB';
connectDatabase(dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
