import { Request, Response } from "express";
import ListClassificationsService from "../services/ListClassificationsService";
import ShowPlayerService from "../services/ShowPlayerService";
import ShowResumeService from "../services/ShowResumeService";

class CompetitiveController {
  public async list(request: Request, response: Response) {
    const { name } = request.params;

    const listClassifications = new ListClassificationsService();

    const result = await listClassifications.execute(name);

    return response.status(200).json(result);
  }

  public async showPlayer(request: Request, response: Response) {
    const { name } = request.params;

    const showPlayer = new ShowPlayerService();

    const result = await showPlayer.execute(name);

    return response.status(200).json(result);
  }

  public async resume(request: Request, response: Response) {
    const { tournament, team } = request.params;

    const showResume = new ShowResumeService();

    const result = await showResume.execute(tournament, team);

    return response.status(200).json(result);
  }
}

export default CompetitiveController;
