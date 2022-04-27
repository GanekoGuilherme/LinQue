import { Request, Response } from 'express';
import CheckEmailUserService from '../services/CheckEmailUserService';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    await createUserService.execute({ name, email, password });

    return response.json({ message: 'Conta criada com sucesso.' });
  }

  public async checkEmail(request: Request, response: Response) {
    const { email } = request.params;

    const checkEmailUserService = new CheckEmailUserService();

    const result = await checkEmailUserService.execute(String(email));

    return response.json(result);
  }
}

export default UserController;
