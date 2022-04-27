import { Router } from 'express';
import MatchController from '../controllers/LolController';

const matchController = new MatchController();

const matchRoutes = Router();

matchRoutes.get('/list/:summonerName', matchController.list);

matchRoutes.post('/update/:puuid', matchController.update);

export default matchRoutes;
