import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/create', userController.store);

userRoutes.post('/validate-email', userController.checkEmail);

userRoutes.post('/active-user', userController.activeUser);

userRoutes.post('/request-active-user/:userId', userController.requestActiveUser);

export default userRoutes;
