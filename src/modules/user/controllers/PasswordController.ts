import MailjetEmailProvider from '@shared/providers/email/MailjetEmailProvider';
import { Request, Response } from 'express';
import { GeneratePasswordTokenProvider } from '../providers/GeneratePasswordTokenProvider';

import RegisterPasswordService from '../services/RegisterPasswordService';
import ResetPasswordService from '../services/ResetPasswordService';

class PasswordController {
  public async reset(request: Request, response: Response) {
    const { email } = request.body;

    const mailjetEmail = new MailjetEmailProvider();
    const generatePasswordTokenProvider = new GeneratePasswordTokenProvider();
    const resetPasswordService = new ResetPasswordService(generatePasswordTokenProvider, mailjetEmail);

    const result = await resetPasswordService.execute(email);

    return response.json(result);
  }

  public async register(request: Request, response: Response) {
    const { token } = request.params;
    const { password } = request.body;

    const generatePasswordTokenProvider = new GeneratePasswordTokenProvider();
    const mailjetEmail = new MailjetEmailProvider();
    const registerPasswordService = new RegisterPasswordService(generatePasswordTokenProvider, mailjetEmail);

    const result = await registerPasswordService.execute(token, password);

    return response.json(result);
  }
}

export default PasswordController;
