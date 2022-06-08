import MailjetEmailProvider from '@shared/providers/email/MailjetEmailProvider';
import { Request, Response } from 'express';
import { GenerateTokenProvider } from '../providers/GenerateTokenProviders';
import { GenerateUserTokenActiveProvider } from '../providers/GenerateUserTokenActiveProvider';
import ActiveUserService from '../services/ActiveUserService';
import CheckEmailUserService from '../services/CheckEmailUserService';
import CreateUserService from '../services/CreateUserService';
import RequestActiveUserService from '../services/RequestActiveUserService';

class UserController {
  public async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const generateTokenProvider = new GenerateTokenProvider();
    const createUserService = new CreateUserService(generateTokenProvider);

    const result = await createUserService.execute({ name, email, password });

    return response.status(201).json(result);
  }

  public async checkEmail(request: Request, response: Response) {
    const { email } = request.body;

    const checkEmailUserService = new CheckEmailUserService();

    const result = await checkEmailUserService.execute(email);

    return response.json(result);
  }

  public async activeUser(request: Request, response: Response) {
    const { token, email } = request.body;

    const generateUserTokenActiveProvider = new GenerateUserTokenActiveProvider();
    const mailjetEmail = new MailjetEmailProvider();
    const activeUserService = new ActiveUserService(generateUserTokenActiveProvider, mailjetEmail);

    const result = await activeUserService.execute(token, email);

    return response.json(result);
  }

  public async requestActiveUser(request: Request, response: Response) {
    const { userId } = request.params;

    const generateUserTokenActiveProvider = new GenerateUserTokenActiveProvider();
    const mailjetEmail = new MailjetEmailProvider();
    const requestActiveUserService = new RequestActiveUserService(generateUserTokenActiveProvider, mailjetEmail);

    const result = await requestActiveUserService.execute(userId);

    return response.json(result);
  }
}

export default UserController;
