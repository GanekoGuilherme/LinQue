import crypto from 'crypto';

class GenerateUserTokenActiveProvider {
  async execute() {
    const token = crypto.randomBytes(20).toString('hex');

    return token;
  }
}

export { GenerateUserTokenActiveProvider };
