import { Request, Response } from 'express';
import ShowResumeSummonerService from '../services/ShowResumeSummonerService';
import ListMatchService from '../services/ListMatchService';

class LolController {
  public async showResume(request: Request, response: Response) {
    const { summonerName } = request.params;

    const showResumeSummonerService = new ShowResumeSummonerService();

    const result = await showResumeSummonerService.execute(String(summonerName));

    return response.json(result);
  }

  public async listMatch(request: Request, response: Response) {
    const { puuid } = request.params;

    const listMatchService = new ListMatchService();

    const result = await listMatchService.execute(String(puuid));

    return response.json(result);
  }
}

export default LolController;
