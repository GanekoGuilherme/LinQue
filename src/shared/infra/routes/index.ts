import { Router } from 'express';

import lolRoutes from '@modules/lol/routes/lol.routes';
import matchRoutes from '@modules/match/routes/match.routes';

const routes = Router();

// routes.use('/credentials');
routes.use('/lol', lolRoutes); //list all
routes.use('/matches', matchRoutes);
// routes.use('/users');
// routes.use('/video');

export default routes;
