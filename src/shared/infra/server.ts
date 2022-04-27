import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import '../../config/bootstrap';
import 'express-async-errors';

import routes from './routes';
import HandleError from '@shared/errors/HandleError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log(error);
  HandleError.handleError({ error, request, response });
});

app.listen(process.env.PORT || 3000, () => console.log('Server is runnning on port 3000'));
