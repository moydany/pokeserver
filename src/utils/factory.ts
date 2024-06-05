import { Container } from 'inversify';
import { UserRepository } from '../repositories/userRepository';
import { AuthService } from '../services/authService';

const container = new Container();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<AuthService>(AuthService).toSelf();

export { container };
