import { Request, Response } from 'express';
import { container } from '../utils/factory';
import { AuthService } from '../services/authService';
import { IUser } from '../models/User';

const authService = container.get<AuthService>(AuthService);

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, lastname } = req.body;
  try {
    const user: IUser = await authService.signup({ email, password, name, lastname } as IUser);
    res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    if (!token) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
};
