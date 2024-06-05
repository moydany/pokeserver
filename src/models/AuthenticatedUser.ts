import mongoose from 'mongoose';

export interface IAuthenticatedUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  lastname: string;
}
