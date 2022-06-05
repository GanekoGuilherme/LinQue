import { getPrivateKey } from '@config/auth';
import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string) {
    const privateKey = getPrivateKey();

    const token = sign({}, privateKey, {
      subject: userId,
      expiresIn: '4h',
    });

    return token;
  }
}

export { GenerateTokenProvider };
