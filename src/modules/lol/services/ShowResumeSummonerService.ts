import { apiRiotBr1 } from '@shared/infra/apis';
import Lolinfos from '../schemas/Lolinfos';
import { v4 as uuidv4 } from 'uuid';

class ShowResumeSummonerService {
  async execute(summonerName: string): Promise<any> {
    const response = await apiRiotBr1.get(`/lol/summoner/v4/summoners/by-name/${summonerName}`);
    const response2 = await apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${response.data.id}`);

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

    const result = { summoner: response.data, league: response2.data };

    return result;
  }
}

export default ShowResumeSummonerService;
