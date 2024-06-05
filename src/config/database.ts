import mongoose from 'mongoose';

export const connectDatabase = async (uri: string) => {
  await mongoose.connect(uri);
};
