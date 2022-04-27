import AppError from '@shared/errors/AppError';
import Users from '../schemas/Users';

interface IResponseDTO {
  message: string;
}

class CheckEmailUserService {
  async execute(email: string): Promise<IResponseDTO> {
    const checkEmail = await Users.findOne({ email });
    if (checkEmail) throw new AppError('E-mail indisponível.', 400);
    return { message: 'E-mail disponível.' };
  }
}

export default CheckEmailUserService;
