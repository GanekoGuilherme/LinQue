import { Request, Response } from 'express';
import { GenerateTokenProvider } from '../providers/GenerateTokenProviders';
import AuthUserService from '../services/AuthUserService';

class AuthController {
  public async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    const generateTokenProvider = new GenerateTokenProvider();
    const authUserService = new AuthUserService(generateTokenProvider);

    const result = await authUserService.execute({ email, password });

    return response.json(result);
  }
}

export default AuthController;
