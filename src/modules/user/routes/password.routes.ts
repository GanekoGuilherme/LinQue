import { Router } from 'express';
import PasswordController from '../controllers/PasswordController';

const passwordController = new PasswordController();

const passwordRoutes = Router();

passwordRoutes.post('/reset', passwordController.reset);

passwordRoutes.post('/register/:token', passwordController.register);

export default passwordRoutes;
