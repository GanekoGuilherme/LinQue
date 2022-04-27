import { Router } from 'express';

import lolRoutes from '@modules/lol/routes/lol.routes';
import matchRoutes from '@modules/match/routes/match.routes';
import userRoutes from '@modules/user/routes/user.routes';

const routes = Router();

// routes.use('/credentials');
routes.use('/lol', lolRoutes); //list all
routes.use('/matches', matchRoutes);
routes.use('/users', userRoutes);
// routes.use('/video');

export default routes;
