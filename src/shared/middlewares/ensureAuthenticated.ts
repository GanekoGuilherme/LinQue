import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { getPublicKey } from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  user: {
    id: string;
  };
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const publicKey = getPublicKey();
    const decoded = verify(token, publicKey);
    const { sub } = decoded as TokenPayload;
    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid JWT', 401);
  }
}
