import { Request, Response } from 'express';
import ListClassificationsService from '../services/ListClassificationsService';

class CompetitiveController {
  public async list(request: Request, response: Response) {
    const { name } = request.params;

    const listClassifications = new ListClassificationsService();

    const result = await listClassifications.execute(name);

    return response.status(200).json(result);
  }
}

export default CompetitiveController;
