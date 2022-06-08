import { Request, Response } from 'express';
import ShowResumeSummonerService from '../services/ShowResumeSummonerService';
import ShowExtensiveSummonerService from '../services/ShowExtensiveSummonerService';

class LolController {
  public async showStatusMatches(request: Request, response: Response) {
    const { dataId } = request.params;

    const showResumeSummonerService = new ShowResumeSummonerService();

    const result = await showResumeSummonerService.execute(String(dataId));

    return response.json(result);
  }

  public async showExtensive(request: Request, response: Response) {
    const { summonerName } = request.params;

    const showExtensiveSummonerService = new ShowExtensiveSummonerService();

    const result = await showExtensiveSummonerService.execute(String(summonerName));

    return response.json(result);
  }
}

export default LolController;
