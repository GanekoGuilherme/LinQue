import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import '../../config/bootstrap';
import 'express-async-errors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('Server is runnning on port 3000'));
