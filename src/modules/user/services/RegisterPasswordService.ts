import AppError from '@shared/errors/AppError';
import MailjetEmailProvider from '@shared/providers/email/MailjetEmailProvider';
import { GeneratePasswordTokenProvider } from '../providers/GeneratePasswordTokenProvider';
import bcryptjs from 'bcryptjs';
import Users from '../schemas/Users';

interface IResponseDTO {
  message: string;
}

class RegisterPasswordService {
  constructor(
    private generatePasswordTokenProvider: GeneratePasswordTokenProvider,
    private mailjetEmail: MailjetEmailProvider,
  ) {
    this.generatePasswordTokenProvider = generatePasswordTokenProvider;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(passwordToken: string, password: string): Promise<IResponseDTO> {
    let message = '';

    const user = await Users.findOne({ passwordToken });
    if (!user) throw new AppError('Token inválido.', 400);

    const minLength = password.length >= 8;
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /[0-9]/.test(password);
    const containsSpecial = /\W|_/.test(password);

    if (!(minLength && containsLetter && containsNumber && containsSpecial)) {
      throw new AppError('Senha Inválida.', 400);
    }

    const dateNow = new Date();

    if (!user.passwordTokenActive) {
      throw new AppError('Não é possível redefinir senha deste usuário.', 400);
    } else if (user.passwordTokenExpires && dateNow <= user.passwordTokenExpires) {
      const hash = await bcryptjs.hash(password, 10);
      await Users.updateOne({ _id: user._id }, { passwordTokenActive: false, password: hash });
      message = 'Senha redefinida com sucesso.';
    } else {
      const token = await this.generatePasswordTokenProvider.execute();
      dateNow.setHours(dateNow.getHours() + 1);

      await this.mailjetEmail.sendEmailToResetPassword({ email: user.email, name: user.name, token });
      await Users.updateOne({ _id: user._id }, { passwordToken: token, passwordTokenExpires: dateNow });

      throw new AppError(
        'Tempo expirado para redefinir a senha deste usuário. Um novo token foi enviado ao e-mail.',
        400,
      );
    }

    return { message };
  }
}

export default RegisterPasswordService;
