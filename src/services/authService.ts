import { inject, injectable } from 'inversify';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { IUser } from '../models/User';

const JWT_SECRET = 'your_jwt_secret';

@injectable()
export class AuthService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async signup(userData: IUser): Promise<IUser> {
    const hashedPassword = await argon2.hash(userData.password);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return user.save();
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) return null;

    const token = jwt.sign(
      {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
    return token;
  }
}
