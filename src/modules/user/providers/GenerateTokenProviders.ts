import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string) {
    const privateKey = process.env.JWT_PRIVATE_KEY;

    if (!privateKey) throw new AppError('Erro interno.', 500);

    const token = sign({}, privateKey, {
      subject: userId,
      expiresIn: '1h',
    });

    return token;
  }
}

export { GenerateTokenProvider };
