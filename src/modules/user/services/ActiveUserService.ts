import AppError from '@shared/errors/AppError';
import MailjetEmailProvider from '@shared/providers/email/MailjetEmailProvider';
import { GenerateUserTokenActiveProvider } from '../providers/GenerateUserTokenActiveProvider';
import Users from '../schemas/Users';

interface IResponseDTO {
  message: string;
}

class ActiveUserService {
  constructor(
    private generateUserTokenActive: GenerateUserTokenActiveProvider,
    private mailjetEmail: MailjetEmailProvider,
  ) {
    this.generateUserTokenActive = generateUserTokenActive;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(token: string, email: string): Promise<IResponseDTO> {
    let message = '';

    const user = await Users.findOne({ email });
    if (!user) throw new AppError('Falha na ativação do usuário.', 400);

    const dateNow = new Date();

    if (user.verify) {
      message = 'Este usuário já está ativo.';
    } else if (user.userTokenActive && user.userTokenActive === token && dateNow <= user.userTokenActiveExpires) {
      await Users.updateOne({ _id: user._id }, { verify: true });
      message = 'Usuário ativado com sucesso.';
    } else {
      const token = await this.generateUserTokenActive.execute();
      dateNow.setHours(dateNow.getHours() + 1);

      await this.mailjetEmail.sendEmailToActiveUser({ email, name: user.name, token });
      await Users.updateOne({ _id: user._id }, { userTokenActive: token, userTokenActiveExpires: dateNow });
      message = `Falha na ativação do usuário. Um novo token foi enviado ao e-mail ${email}`;
    }

    return { message };
  }
}

export default ActiveUserService;
