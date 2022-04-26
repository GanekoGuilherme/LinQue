import { Router } from 'express';
import LolController from '../controllers/LolController';

const lolController = new LolController();

const lolRoutes = Router();

lolRoutes.get('/resume/:summonerName', lolController.showResume);

// lolRoutes.get('/matches/:summonerName', lolController.listMatch);

export default lolRoutes;
