import { Router } from 'express';

import authRoutes from '@modules/user/routes/auth.routes';
import lolRoutes from '@modules/lol/routes/lol.routes';
import matchRoutes from '@modules/match/routes/match.routes';
import userRoutes from '@modules/user/routes/user.routes';
import passwordRoutes from '@modules/user/routes/password.routes';
import videoRoutes from '@modules/video/routes/video.routes';
import competitiveRoutes from '@modules/competitive/routes/competitive.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/password', passwordRoutes);
routes.use('/lol', lolRoutes); //list all
routes.use('/matches', matchRoutes);
routes.use('/users', userRoutes);
routes.use('/video', videoRoutes);
routes.use('/competitive', competitiveRoutes);

export default routes;
