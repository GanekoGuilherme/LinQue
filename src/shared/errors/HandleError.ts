import AppError from './AppError';
import { Request, Response } from 'express';

interface IHandleError {
  error: Error;
  request: Request;
  response: Response;
}

export default {
  handleError: ({ error, request, response }: IHandleError): Response => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json(error);
    }

    return response.status(500).json({ message: 'Internal server error.' });
  },
};
