import express from 'express';
import {
  getAndSavePokemon,
  deletePokemonById,
  deletePokemonByName,
  listPokemons,
  deletePokemonsByType,
} from '../controllers/pokemonController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pokemon
 *   description: Pokemon management endpoints
 */

/**
 * @swagger
 * /api/pokemon/{name}:
 *   get:
 *     summary: Get and save a Pokemon by name
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the Pokemon
 *     responses:
 *       201:
 *         description: Pokemon created
 *       500:
 *         description: Error fetching or saving Pokemon
 */
router.get('/:name', authenticate, getAndSavePokemon);

/**
 * @swagger
 * /api/pokemon/id/{id}:
 *   delete:
 *     summary: Delete a Pokemon by ID
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the Pokemon
 *     responses:
 *       204:
 *         description: Pokemon deleted
 *       500:
 *         description: Error deleting Pokemon
 */
router.delete('/id/:id', authenticate, deletePokemonById);

/**
 * @swagger
 * /api/pokemon/name/{name}:
 *   delete:
 *     summary: Delete a Pokemon by name
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the Pokemon
 *     responses:
 *       204:
 *         description: Pokemon deleted
 *       500:
 *         description: Error deleting Pokemon
 */
router.delete('/name/:name', authenticate, deletePokemonByName);

/**
 * @swagger
 * /api/pokemon:
 *   get:
 *     summary: List all Pokemons for a user
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: List of Pokemons
 *       500:
 *         description: Error listing Pokemons
 */
router.get('/', authenticate, listPokemons);

/**
 * @swagger
 * /api/pokemon/type/{type}:
 *   delete:
 *     summary: Delete Pokemons by type
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of the Pokemon
 *     responses:
 *       204:
 *         description: Pokemons deleted
 *       500:
 *         description: Error deleting Pokemons by type
 */
router.delete('/type/:type', authenticate, deletePokemonsByType);

export default router;
