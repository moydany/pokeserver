import mongoose, { Document, Schema } from 'mongoose';

export interface IPokemon extends Document {
  id: number;
  name: string;
  moves: string[];
  types: string[];
  image: string;
  owner: mongoose.Types.ObjectId;
}

const PokemonSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  moves: { type: [String], required: true },
  types: { type: [String], required: true },
  image: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

const Pokemon = mongoose.model<IPokemon>('Pokemon', PokemonSchema);
export default Pokemon;
