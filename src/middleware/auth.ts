import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import InvalidToken from '../models/InvalidToken';
import { IAuthenticatedUser } from '../models/AuthenticatedUser';
import mongoose from 'mongoose';

const JWT_SECRET = 'your_jwt_secret';

interface AuthRequest extends Request {
  user?: IAuthenticatedUser;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Access denied, no token provided' });
  }
  try {
    const invalidToken = await InvalidToken.findOne({ token });
    if (invalidToken) {
      return res.status(401).send({ message: 'Invalid token' });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as IAuthenticatedUser & {
      _id: string;
    };
    req.user = {
      _id: new mongoose.Types.ObjectId(decoded._id),
      email: decoded.email,
      name: decoded.name,
      lastname: decoded.lastname,
    };
    next();
  } catch (error) {
    res.status(400).send({ message: 'Invalid token' });
  }
};
