import { Request, Response } from 'express';
import ListMatchesFromDBService from '../services/ListMatchesFromDBService';
import UpdateMatchesService from '../services/UpdateMatchesService';

class MatchController {
  public async list(request: Request, response: Response) {
    const { summonerName } = request.params;

    const listMatchesService = new ListMatchesFromDBService();

    const result = await listMatchesService.execute(String(summonerName));

    return response.json(result);
  }

  public async update(request: Request, response: Response) {
    const { puuid } = request.params;

    const updateMatchesService = new UpdateMatchesService();

    updateMatchesService.execute(puuid);

    return response.json({ message: 'Atualização da lista de partidas iniciada.' });
  }
}

export default MatchController;
