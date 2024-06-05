import { injectable } from 'inversify';
import User, { IUser } from '../models/User';

@injectable()
export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }
}