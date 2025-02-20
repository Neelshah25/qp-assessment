import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

let user: User | null = null;

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  console.log('Authenticating user');
  user = null;

  const token = req.header('Authorization');

  if (!token) {
    res.status(403).json({ message: 'No token provided' });
    return;
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;

    // Attach the decoded token to req.user
    user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden' });
    }
    else {
      next();
    }
  };
};

