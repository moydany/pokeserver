import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { PokemonService } from '../services/pokemonService';
import { TYPES } from '../types';
import { IAuthenticatedUser } from '../models/AuthenticatedUser';
import logger from '../config/logger';

const pokemonService = container.get<PokemonService>(TYPES.PokemonService);

interface AuthRequest extends Request {
  user?: IAuthenticatedUser;
}

export const getAndSavePokemon = async (req: AuthRequest, res: Response) => {
  try {
    const name = req.params.name;
    logger.info(`Received request to create Pokemon: ${name}`);
    logger.info(`Authenticated user: ${JSON.stringify(req.user)}`);
    const pokemon = await pokemonService.createPokemon(name, req.user!);
    res.status(201).send(pokemon);
  } catch (error) {
    logger.error('Error fetching or saving Pokemon:', error);
    res
      .status(500)
      .send({ message: 'Error fetching or saving Pokemon', error });
  }
};

export const deletePokemonById = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    logger.info(`Received request to delete Pokemon by ID: ${id}`);
    await pokemonService.deletePokemonById(parseInt(id));
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting Pokemon by ID:', error);
    res.status(500).send({ message: 'Error deleting Pokemon', error });
  }
};

export const deletePokemonByName = async (req: AuthRequest, res: Response) => {
  try {
    const name = req.params.name;
    logger.info(`Received request to delete Pokemon by name: ${name}`);
    await pokemonService.deletePokemonByName(name, req.user!);
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting Pokemon by name:', error);
    res.status(500).send({ message: 'Error deleting Pokemon', error });
  }
};

export const listPokemons = async (req: AuthRequest, res: Response) => {
  try {
    logger.info(`Received request to list Pokemons for user: ${req.user!._id}`);
    const pokemons = await pokemonService.listPokemons(req.user!);
    res.status(200).send(pokemons);
  } catch (error) {
    logger.error('Error listing Pokemons:', error);
    res.status(500).send({ message: 'Error listing Pokemons', error });
  }
};

export const deletePokemonsByType = async (req: AuthRequest, res: Response) => {
  try {
    const type = req.params.type;
    logger.info(`Received request to delete Pokemons by type: ${type}`);
    await pokemonService.deletePokemonsByType(type, req.user!);
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting Pokemons by type:', error);
    res.status(500).send({ message: 'Error deleting Pokemons by type', error });
  }
};
