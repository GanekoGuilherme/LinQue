import { Router } from 'express';
import LolController from '../controllers/LolController';

const lolController = new LolController();

const lolRoutes = Router();

lolRoutes.get('/resume/:dataId', lolController.showStatusMatches);

lolRoutes.get('/extensive/:summonerName', lolController.showExtensive);

export default lolRoutes;
