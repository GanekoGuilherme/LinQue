import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authController = new AuthController();

const authRoutes = Router();

authRoutes.post('/', authController.auth);

export default authRoutes;
