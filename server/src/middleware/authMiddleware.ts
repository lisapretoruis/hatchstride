import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { decode } from 'punycode';

export interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  console.log('Verifying token...');
  const authHeader = req.headers.authorization;
  console.log('Authorization header:', authHeader); // Log the authorization header for debugging
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token); // Log the token for debugging
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decoded.userId;
    console.log('Decoded user id:', decoded.userId);
    next(); 
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};
