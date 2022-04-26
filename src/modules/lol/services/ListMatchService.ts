import { apiRiotAmericas } from '@shared/infra/apis';

class ListMatchService {
  async execute(puuid: string): Promise<any> {
    try {
      const response = await apiRiotAmericas.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
        params: { start: 0, count: 10 },
      });
      const response2 = await apiRiotAmericas.get(`/lol/match/v5/matches/${response.data[0]}`);
      const response3 = await apiRiotAmericas.get(`/lol/match/v5/matches/${response.data[1]}`);
      const result = { lastMatchs: response.data, detailMatch: [response2.data, response3.data] };
      return result;
    } catch (error: any) {
      console.log(error?.response.data);
    }
  }
}

export default ListMatchService;
