import { Container } from 'inversify';
import { PokemonService } from './services/pokemonService';
import { PokemonRepository } from './repositories/pokemonRepository';
import { UserRepository } from './repositories/userRepository';
import { AuthService } from './services/authService';

// Importar los identificadores de servicio
import { TYPES } from './types';

const container = new Container();

// Vincular las clases a los identificadores de servicio
container.bind<PokemonService>(TYPES.PokemonService).to(PokemonService);
container
  .bind<PokemonRepository>(TYPES.PokemonRepository)
  .to(PokemonRepository);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);

export { container };
