import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/create', userController.store);

userRoutes.get('/validate-email/:email', userController.checkEmail);

export default userRoutes;
