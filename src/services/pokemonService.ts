import { inject, injectable } from 'inversify';
import axios from 'axios';
import { PokemonRepository } from '../repositories/pokemonRepository';
import { IPokemon } from '../models/Pokemon';
import { IAuthenticatedUser } from '../models/AuthenticatedUser';
import { CacheSingleton } from '../cacheSingleton';
import { TYPES } from '../types';
import mongoose from 'mongoose';

@injectable()
export class PokemonService {
  constructor(
    @inject(TYPES.PokemonRepository)
    private pokemonRepository: PokemonRepository,
  ) {}

  private async getPokemonData(name: string): Promise<Partial<IPokemon>> {
    const cache = CacheSingleton.getInstance();
    if (cache.has(name)) {
      console.log(`Cache hit for ${name}`);
      return cache.get(name);
    }
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    const data = response.data;
    const pokemon = {
      id: data.id,
      name: data.name,
      moves: data.moves.slice(0, 4).map((move: any) => move.move.name),
      types: data.types.map((type: any) => type.type.name),
      image: data.sprites.front_default,
    };
    console.log(`Fetched data for ${name}:`, pokemon);
    cache.set(name, pokemon);
    return pokemon;
  }

  async createPokemon(
    name: string,
    owner: IAuthenticatedUser,
  ): Promise<IPokemon> {
    const pokemonData = await this.getPokemonData(name);
    console.log(`Creating Pokemon with data:`, {
      ...pokemonData,
      owner: owner._id,
    });
    const pokemon = await this.pokemonRepository.create({
      ...pokemonData,
      owner: new mongoose.Types.ObjectId(owner._id),
    });
    console.log(`Pokemon created:`, pokemon);
    return pokemon;
  }

  async deletePokemonById(id: number): Promise<void> {
    await this.pokemonRepository.deleteById(id);
  }

  async deletePokemonByName(
    name: string,
    owner: IAuthenticatedUser,
  ): Promise<void> {
    await this.pokemonRepository.deleteByName(
      name,
      new mongoose.Types.ObjectId(owner._id),
    );
  }

  async listPokemons(owner: IAuthenticatedUser): Promise<IPokemon[]> {
    const pokemons = await this.pokemonRepository.findByOwner(
      new mongoose.Types.ObjectId(owner._id),
    );
    console.log(`Found Pokemons for owner ${owner._id}:`, pokemons);
    return pokemons;
  }

  async deletePokemonsByType(
    type: string,
    owner: IAuthenticatedUser,
  ): Promise<void> {
    await this.pokemonRepository.deleteByType(
      type,
      new mongoose.Types.ObjectId(owner._id),
    );
  }
}
