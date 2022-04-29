import AppError from '@shared/errors/AppError';
import MailjetEmailProvider from '@shared/providers/email/MailjetEmailProvider';
import { GenerateUserTokenActiveProvider } from '../providers/GenerateUserTokenActiveProvider';
import Users from '../schemas/Users';

interface IResponseDTO {
  message: string;
}

class RequestActiveUserService {
  constructor(
    private generateUserTokenActive: GenerateUserTokenActiveProvider,
    private mailjetEmail: MailjetEmailProvider,
  ) {
    this.generateUserTokenActive = generateUserTokenActive;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(userId: string): Promise<IResponseDTO> {
    const user = await Users.findOne({ _id: userId });
    if (!user) throw new AppError('Usuário não encontrado.', 404);

    const token = await this.generateUserTokenActive.execute();
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 1);
    await this.mailjetEmail.sendEmailToActiveUser({ email: user.email, name: user.name, token });
    await Users.updateOne({ _id: user._id }, { userTokenActive: token, userTokenActiveExpires: dateNow });

    return { message: `Token para ativação do usuário enviado no e-mail ${user.email}.` };
  }
}

export default RequestActiveUserService;
