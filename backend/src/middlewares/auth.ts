import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['auth_token'];
  if (!token) return res.status(401).json({ message: 'You are unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    if (!decoded)
      return res.status(401).json({ message: 'You are unauthorized' });
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'You are unauthorized' });
  }
};
