import { Request, Response } from 'express';
import { GenerateTokenProvider } from '../providers/GenerateTokenProviders';
import CheckEmailUserService from '../services/CheckEmailUserService';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const generateTokenProvider = new GenerateTokenProvider();
    const createUserService = new CreateUserService(generateTokenProvider);

    const result = await createUserService.execute({ name, email, password });

    return response.json(result);
  }

  public async checkEmail(request: Request, response: Response) {
    const { email } = request.params;

    const checkEmailUserService = new CheckEmailUserService();

    const result = await checkEmailUserService.execute(String(email));

    return response.json(result);
  }
}

export default UserController;
