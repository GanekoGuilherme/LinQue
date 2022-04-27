import { apiRiotAmericas, apiRiotBr1 } from '@shared/infra/apis';
import Lolinfos from '../schemas/Lolinfos';
import { v4 as uuidv4 } from 'uuid';
import Matches from '@modules/match/schemas/Matches';

interface IResume {
  _id: string;
  puuid: string;
  summonerId: string;
  name: string;
  profileIconId: string;
  revisionDate: number;
  summonerLevel: string;
}

class ShowExtensiveSummonerService {
  async execute(summonerName: string): Promise<any> {
    let resume: IResume | null;
    let matches: any;

    resume = await Lolinfos.findOne({ name: { $regex: new RegExp('^' + summonerName + '$', 'i') } });

    if (!resume) {
      const response = await apiRiotBr1.get(`/lol/summoner/v4/summoners/by-name/${summonerName}`);
      const response2 = await apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${response.data.id}`);

      resume = await Lolinfos.findOneAndUpdate(
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
        { upsert: true, new: true },
      );
    }

    matches = await Matches.find({
      'info.participants.summonerName': { $regex: new RegExp('^' + summonerName + '$', 'i') },
    })
      .sort({
        'info.gameEndTimestamp': -1,
      })
      .limit(10);

    if (matches.length < 10) {
      matches = [];
      const response = await apiRiotAmericas.get(`/lol/match/v5/matches/by-puuid/${resume?.puuid}/ids`, {
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
    }

    return { resume, matches };
  }
}

export default ShowExtensiveSummonerService;
