import AppError from '@shared/errors/AppError';

export const getPrivateKey = (): string => {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  if (!privateKey) {
    console.log('PRIVATE_KEY não encontrada.');
    throw new AppError('Erro Interno', 500);
  }
  return privateKey;
};

export const getPublicKey = (): string => {
  const publicKey = process.env.JWT_PUBLIC_KEY;

  if (!publicKey) {
    console.log('PUBLIC_KEY não encontrada.');
    throw new AppError('Erro Interno', 500);
  }
  return publicKey;
};
