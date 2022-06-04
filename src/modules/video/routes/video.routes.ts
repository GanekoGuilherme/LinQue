import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/multer';
import VideoController from '../controllers/VideoController';

const videoController = new VideoController();

const videoRoutes = Router();

videoRoutes.post('/', multer(multerConfig).single('file'), videoController.upload);

export default videoRoutes;
