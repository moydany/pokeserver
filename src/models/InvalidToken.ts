import mongoose, { Document, Schema } from 'mongoose';

interface IInvalidToken extends Document {
  token: string;
  expiresAt: Date;
}

const InvalidTokenSchema: Schema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const InvalidToken = mongoose.model<IInvalidToken>(
  'InvalidToken',
  InvalidTokenSchema,
);
export default InvalidToken;
