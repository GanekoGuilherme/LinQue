import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multer';
import VideoController from '../controllers/VideoController';
import ensureAuthenticated from '@shared/middlewares/ensureAuthenticated';
import ensureAccountVerify from '@shared/middlewares/ensureAccountVerify';

const videoController = new VideoController();

const videoRoutes = Router();

videoRoutes.get('/', videoController.list);
videoRoutes.get('/summoner/:summonerName', videoController.listBySummoner);
videoRoutes.use(ensureAuthenticated);
videoRoutes.post('/', ensureAccountVerify, multer(multerConfig).single('file'), videoController.upload);

export default videoRoutes;
