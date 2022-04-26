import Lolinfos from '@modules/lol/schemas/Lolinfos';
import { apiRiotAmericas } from '@shared/infra/apis';
import Matches from '../schemas/Matches';
import { v4 as uuidv4 } from 'uuid';

class ListMatchesService {
  async execute(puuid: string): Promise<any> {
    try {
      const matches: any[] = [];
      await Lolinfos.updateOne({ puuid }, { statusMatchesUpdate: 'PROGRESS' });

      const response = await apiRiotAmericas.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
        params: { start: 0, count: 10 },
      });

      const IdsMatch: string[] = response.data;

      await Promise.all(
        IdsMatch.map(async match => {
          const response = await apiRiotAmericas.get(`/lol/match/v5/matches/${match}`);
          const matchUpdated = await Matches.findOneAndUpdate(
            { matchId: match },
            {
              $setOnInsert: { _id: uuidv4() },
              $set: {
                matchId: response.data.matchId,
                participants: response.data.participants,
                info: response.data.info,
              },
            },
            { upsert: true, new: true },
          );
          matches.push(matchUpdated);
        }),
      );
      await Lolinfos.updateOne({ puuid }, { statusMatchesUpdate: 'DONE' });
      return matches;
    } catch (error: any) {
      if (error?.response?.data) console.log(error?.response?.data);
      else console.log(error);
      await Lolinfos.updateOne({ puuid }, { statusMatchesUpdate: 'FAILURE' });
    }
  }
}

export default ListMatchesService;
