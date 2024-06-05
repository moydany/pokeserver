import { injectable } from 'inversify';
import Pokemon, { IPokemon } from '../models/Pokemon';
import mongoose from 'mongoose';

@injectable()
export class PokemonRepository {
  async create(pokemonData: Partial<IPokemon>): Promise<IPokemon> {
    const pokemon = new Pokemon(pokemonData);
    return pokemon.save();
  }

  async findById(id: number): Promise<IPokemon | null> {
    return Pokemon.findOne({ id }).exec();
  }

  async deleteById(id: number): Promise<void> {
    await Pokemon.findOneAndDelete({ id }).exec();
  }

  async findByOwner(ownerId: mongoose.Types.ObjectId): Promise<IPokemon[]> {
    return Pokemon.find({ owner: ownerId }).exec();
  }

  async deleteByName(
    name: string,
    ownerId: mongoose.Types.ObjectId,
  ): Promise<void> {
    await Pokemon.findOneAndDelete({ name, owner: ownerId }).exec();
  }

  async deleteByType(
    type: string,
    ownerId: mongoose.Types.ObjectId,
  ): Promise<void> {
    await Pokemon.deleteMany({ types: type, owner: ownerId }).exec();
  }

  async deleteMany(filter: Record<string, unknown>): Promise<void> {
    await Pokemon.deleteMany(filter).exec();
  }
}
