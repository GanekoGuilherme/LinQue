import AppError from '@shared/errors/AppError';
import Users from '../schemas/Users';
import { compare } from 'bcryptjs';
import { GenerateTokenProvider } from '../providers/GenerateTokenProviders';
import Lolinfos from '@modules/lol/schemas/Lolinfos';

interface IRequestDTO {
  email?: string;
  password?: string;
}

interface IUserInterface {
  userId: string;
  name: string;
  email: string;
  summonerName?: string;
}

interface IResponseDTO {
  token: string;
  user: IUserInterface;
}

class AuthUserService {
  constructor(private generateToken: GenerateTokenProvider) {
    this.generateToken = generateToken;
  }

  async execute({ email, password }: IRequestDTO): Promise<IResponseDTO> {
    if (!email) throw new AppError('E-mail não enviado.');
    if (!password) throw new AppError('Senha não enviada.');

    const checkUser = await Users.findOne({ email });
    if (!checkUser) throw new AppError('Usuário ou senha incorretos.', 404);

    const passwordMatch = await compare(password, checkUser.password);

    if (!passwordMatch) throw new AppError('Usuário ou senha incorretos.', 404);

    const token = await this.generateToken.execute(checkUser._id);

    const data = await Lolinfos.findOne({ userId: checkUser._id }).select('name');

    return {
      token,
      user: { userId: checkUser._id, name: checkUser.name, email: checkUser.email, summonerName: data?.name },
    };
  }
}

export default AuthUserService;
