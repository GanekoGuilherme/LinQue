import crypto from 'crypto';

class GeneratePasswordTokenProvider {
  async execute() {
    const token = crypto.randomBytes(20).toString('hex');

    return token;
  }
}

export { GeneratePasswordTokenProvider };
