import 'reflect-metadata';
import { Container } from 'inversify';
import { PokemonService } from '../services/pokemonService';
import { PokemonRepository } from '../repositories/pokemonRepository';
import { IUser } from '../models/User';
import mongoose from 'mongoose';
import { TYPES } from '../types';

describe('PokemonService', () => {
  let container: Container;
  let pokemonService: PokemonService;
  let pokemonRepository: PokemonRepository;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/testDB');

    container = new Container();
    container
      .bind<PokemonRepository>(TYPES.PokemonRepository)
      .to(PokemonRepository);
    container.bind<PokemonService>(TYPES.PokemonService).to(PokemonService);

    pokemonService = container.get<PokemonService>(TYPES.PokemonService);
    pokemonRepository = container.get<PokemonRepository>(
      TYPES.PokemonRepository,
    );
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await pokemonRepository.deleteMany({});
  });

  describe('createPokemon', () => {
    it('should create a new Pokemon', async () => {
      const user: IUser = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@example.com',
        password: 'password123',
        name: 'John',
        lastname: 'Doe',
      } as IUser;
      const pokemon = await pokemonService.createPokemon('pikachu', user);
      expect(pokemon).toHaveProperty('_id');
      expect(pokemon.name).toBe('pikachu');

      const foundPokemon = await pokemonRepository.findById(pokemon.id);
      expect(foundPokemon).not.toBeNull();
    });
  });

  describe('deletePokemonById', () => {
    it('should delete a Pokemon by ID', async () => {
      const user: IUser = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@example.com',
        password: 'password123',
        name: 'John',
        lastname: 'Doe',
      } as IUser;
      const pokemon = await pokemonService.createPokemon('bulbasaur', user);
      await pokemonService.deletePokemonById(pokemon.id);

      const foundPokemon = await pokemonRepository.findById(pokemon.id);
      expect(foundPokemon).toBeNull();
    });
  });

  describe('deletePokemonByName', () => {
    it('should delete a Pokemon by name', async () => {
      const user: IUser = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@example.com',
        password: 'password123',
        name: 'John',
        lastname: 'Doe',
      } as IUser;
      const pokemon = await pokemonService.createPokemon('charmander', user);
      await pokemonService.deletePokemonByName(pokemon.name, user);

      const foundPokemon = await pokemonRepository.findById(pokemon.id);
      expect(foundPokemon).toBeNull();
    });
  });

  describe('listPokemons', () => {
    it('should list all Pokemons for a user', async () => {
      const user: IUser = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@example.com',
        password: 'password123',
        name: 'John',
        lastname: 'Doe',
      } as IUser;
      await pokemonService.createPokemon('squirtle', user);
      const pokemons = await pokemonService.listPokemons(user);
      expect(pokemons.length).toBeGreaterThan(0);
    });
  });

  describe('deletePokemonsByType', () => {
    it('should delete Pokemons by type', async () => {
      const user: IUser = {
        _id: new mongoose.Types.ObjectId(),
        email: 'test@example.com',
        password: 'password123',
        name: 'John',
        lastname: 'Doe',
      } as IUser;
      await pokemonService.createPokemon('bulbasaur', user);
      await pokemonService.createPokemon('ivysaur', user);
      await pokemonService.deletePokemonsByType('grass', user);

      const pokemons = await pokemonService.listPokemons(user);
      expect(pokemons.length).toBe(0);
    });
  });
});
