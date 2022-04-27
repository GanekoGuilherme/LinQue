import AppError from '@shared/errors/AppError';
import Users from '../schemas/Users';
import { v4 as uuidv4 } from 'uuid';

interface IRequestDTO {
  name?: string;
  email?: string;
  password?: string;
}

class CreateUserService {
  async execute({ name, email, password }: IRequestDTO): Promise<void> {
    if (!name) throw new AppError('Nome não enviado.');
    if (!email) throw new AppError('E-mail não enviado.');
    if (!password) throw new AppError('Senha não enviada.');

    const checkEmail = await Users.findOne({ email });
    if (checkEmail) throw new AppError('E-mail indisponível.', 400);

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])[@!#$%^&*+\-.,;_:'~()/\\a-zA-Z\d]{8,16}$/;

    if (!pattern.test(password)) {
      throw new AppError('Senha Inválida!', 400);
    }

    await Users.create({ _id: uuidv4(), name, email, password, verify: false, passwordToken: uuidv4() });
  }
}

export default CreateUserService;
