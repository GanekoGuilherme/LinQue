import { apiRiotBr1 } from '@shared/infra/apis';
import Lolinfos from '../schemas/Lolinfos';
import { v4 as uuidv4 } from 'uuid';
import AppError from '@shared/errors/AppError';

class ShowResumeSummonerService {
  async execute(summonerName: string): Promise<any> {
    const response = await apiRiotBr1
      .get(`/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`)
      .catch((error: any) => {
        if (error?.response?.data?.status?.message === 'Data not found - summoner not found') {
          throw new AppError('Invocador não encontrado.', 404);
        }
        throw new AppError('Falha na comunicação com API Riot.', 500);
      });
    const response2 = await apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${response.data.id}`);

    const result = { totalWins: 0, totalLosses: 0, totalMatches: 0 };
    response2.data.forEach((league: { queueType: string; wins: number; losses: number }) => {
      if (league.queueType === 'RANKED_SOLO_5x5' || league.queueType === 'RANKED_FLEX_SR') {
        result.totalWins += league.wins;
        result.totalLosses += league.losses;
        result.totalMatches += league.wins + league.losses;
      }
    });

    await Lolinfos.findOneAndUpdate(
      { puuid: response.data.puuid },
      {
        $setOnInsert: { _id: uuidv4() },

        $set: {
          puuid: response.data.puuid,
          summonerId: response.data.id,
          name: response.data.name,
          profileIconId: response.data.profileIconId,
          revisionDate: response.data.revisionDate,
          summonerLevel: response.data.summonerLevel,
        },
      },
      { upsert: true },
    );

    return { summoner: response.data, result, league: response2.data };
  }
}

export default ShowResumeSummonerService;
