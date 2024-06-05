import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Asegúrate de que _id está tipado correctamente
  email: string;
  password: string;
  name: string;
  lastname: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
