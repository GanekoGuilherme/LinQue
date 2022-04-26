import { Request, Response } from 'express';
import ListMatchesService from '../services/ListMatchesService';
import ListMatchesService2 from '../services/ListMatchesService2';
import UpdateMatchesService from '../services/UpdateMatchesService';

class MatchController {
  public async list(request: Request, response: Response) {
    const { summonerName } = request.params;

    const listMatchesService = new ListMatchesService2();

    const result = await listMatchesService.execute(String(summonerName));

    return response.json(result);
  }

  // public async show(request: Request, response: Response) {
  //   const { puuid } = request.params;

  //   const listMatchService = new ShowMatchService();

  //   const result = await listMatchService.execute(String(puuid));

  //   return response.json(result);
  // }

  public async update(request: Request, response: Response) {
    const { puuid } = request.params;

    const updateMatchesService = new UpdateMatchesService();

    updateMatchesService.execute(puuid);

    return response.json({ message: 'Atualização da lista de partidas iniciada.' });
  }
}

export default MatchController;
