import AppError from '@shared/errors/AppError';
import Users from '../schemas/Users';
import { v4 as uuidv4 } from 'uuid';
import { GenerateTokenProvider } from '../providers/GenerateTokenProviders';

interface IRequestDTO {
  name?: string;
  email?: string;
  password?: string;
}

interface IUserInterface {
  userId: string;
  name: string;
  email: string;
}

interface IResponseDTO {
  token: string;
  user: IUserInterface;
}

class CreateUserService {
  constructor(private generateToken: GenerateTokenProvider) {
    this.generateToken = generateToken;
  }

  async execute({ name, email, password }: IRequestDTO): Promise<IResponseDTO> {
    if (!name) throw new AppError('Nome não enviado.');
    if (!email) throw new AppError('E-mail não enviado.');
    if (!password) throw new AppError('Senha não enviada.');

    const checkEmail = await Users.findOne({ email });
    if (checkEmail) throw new AppError('E-mail indisponível.', 400);

    const minLength = password.length >= 8;
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /[0-9]/.test(password);
    const containsSpecial = /\W|_/.test(password);

    if (!(minLength && containsLetter && containsNumber && containsSpecial)) {
      throw new AppError('Senha Inválida.', 400);
    }

    const user = await Users.create({ _id: uuidv4(), name, email, password, verify: false, passwordToken: uuidv4() });

    const token = await this.generateToken.execute(user._id);

    return { token, user: { userId: user._id, name: user.name, email: user.email } };
  }
}

export default CreateUserService;
