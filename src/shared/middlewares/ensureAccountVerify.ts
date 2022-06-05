import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import Lolinfos from '@modules/lol/schemas/Lolinfos';

export default async function ensureAccountVerify(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const userId = request.user.id;

  const lol = await Lolinfos.findOne({ userId });

  if (!lol) {
    throw new AppError('Não existe conta LoL associada a este usuário.', 400);
  }

  request.user.dataId = lol._id;

  return next();
}
