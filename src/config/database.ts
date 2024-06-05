import mongoose from 'mongoose';

const connectDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
};

export { connectDatabase };
