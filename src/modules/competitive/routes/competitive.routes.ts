import { Router } from 'express';
import CompetitiveController from '../controllers/CompetitiveController';

const competitiveController = new CompetitiveController();

const competitiveRoutes = Router();

competitiveRoutes.get('/classifications/:name', competitiveController.list);

export default competitiveRoutes;
