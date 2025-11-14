import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { IUser } from '../models/User';

export const authenticate = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token
    console.log('token', token);
    

    if (!token) {
      res.status(403).json({ error: 'Access denied, token missing' });
      return;
    }

    try {
      const decoded = verifyToken(token);

      if (!decoded) {
        res.status(403).json({ error: 'Invalid or expired token' });
        return;
      }

      req.body.decoded = decoded; // Attach decoded token to request
      console.log('decoded', decoded);
      next(); // Call next() to pass control to the next middleware or route handler
    } catch (err) {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  };
};
