import 'reflect-metadata';
import { Container } from 'inversify';
import { AuthService } from '../services/authService';
import { UserRepository } from '../repositories/userRepository';
import { IUser } from '../models/User';
import mongoose from 'mongoose';

describe('AuthService', () => {
  let container: Container;
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/pokeDB');

    container = new Container();
    container.bind<UserRepository>(UserRepository).toSelf();
    container.bind<AuthService>(AuthService).toSelf();

    authService = container.get<AuthService>(AuthService);
    userRepository = container.get<UserRepository>(UserRepository);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const userData: IUser = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John',
        lastname: 'Doe',
      } as IUser;
      const user = await authService.signup(userData);
      expect(user).toHaveProperty('_id');
      expect(user.email).toBe(userData.email);
    });
  });

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const userData: IUser = {
        email: 'login@example.com',
        password: 'password123',
        name: 'Jane',
        lastname: 'Doe',
      } as IUser;
      await authService.signup(userData);
      const token = await authService.login(userData.email, 'password123');
      expect(token).not.toBeNull();
    });

    it('should return null for invalid credentials', async () => {
      const token = await authService.login(
        'invalid@example.com',
        'wrongpassword',
      );
      expect(token).toBeNull();
    });
  });
});
