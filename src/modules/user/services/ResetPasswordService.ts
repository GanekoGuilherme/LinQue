import AppError from '@shared/errors/AppError';
import MailjetEmailProvider from '@shared/providers/email/MailjetEmailProvider';
import { GeneratePasswordTokenProvider } from '../providers/GeneratePasswordTokenProvider';

import Users from '../schemas/Users';

interface IResponseDTO {
  message: string;
}

class ResetPasswordService {
  constructor(
    private generatePasswordTokenProvider: GeneratePasswordTokenProvider,
    private mailjetEmail: MailjetEmailProvider,
  ) {
    this.generatePasswordTokenProvider = generatePasswordTokenProvider;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(email: string): Promise<IResponseDTO> {
    const user = await Users.findOne({ email });
    if (!user) throw new AppError('Usuário não encontrado.', 404);

    const token = await this.generatePasswordTokenProvider.execute();
    const dateTokenExpires = new Date();
    dateTokenExpires.setHours(dateTokenExpires.getHours() + 1);

    await this.mailjetEmail.sendEmailToResetPassword({ email, name: user.name, token });

    await Users.updateOne(
      { _id: user._id },
      { passwordToken: token, passwordTokenExpires: dateTokenExpires, passwordTokenActive: true },
    );

    return { message: `Link para a redefinir senha enviado no e-mail ${email}.` };
  }
}

export default ResetPasswordService;
