import { apiRiotAmericas, apiRiotBr1 } from '@shared/infra/apis';
import Lolinfos from '../schemas/Lolinfos';
import { v4 as uuidv4 } from 'uuid';
import Matches from '@modules/match/schemas/Matches';
import AppError from '@shared/errors/AppError';
import Videos from '@modules/video/schemas/Videos';

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
    let summoner: IResume;
    let matches: any;
    let league: any;

    const response = await apiRiotBr1
      .get(`/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`)
      .catch((error: any) => {
        if (error?.response?.data?.status?.message === 'Data not found - summoner not found') {
          throw new AppError('Invocador não encontrado.', 404);
        }
        throw new AppError('Falha na comunicação com API Riot.', 500);
      });
    const response2 = await apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${response.data.id}`);
    league = response2.data;

    summoner = await Lolinfos.findOneAndUpdate(
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

    const result = { totalWins: 0, totalLosses: 0, totalMatches: 0 };
    league.forEach((league: { queueType: string; wins: number; losses: number }) => {
      if (league.queueType === 'RANKED_SOLO_5x5' || league.queueType === 'RANKED_FLEX_SR') {
        result.totalWins += league.wins;
        result.totalLosses += league.losses;
        result.totalMatches += league.wins + league.losses;
      }
    });

    matches = await Matches.find({
      'info.participants.summonerName': { $regex: new RegExp('^' + summonerName + '$', 'i') },
    })
      .sort({
        'info.gameEndTimestamp': -1,
      })
      .limit(10);

    if (matches.length < 10) {
      matches = [];
      const response = await apiRiotAmericas.get(`/lol/match/v5/matches/by-puuid/${summoner?.puuid}/ids`, {
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

    const videos = await Videos.find({ dataId: summoner._id })
      .select('_id name url createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    return { summoner, result, league, matches, videos };
  }
}

export default ShowExtensiveSummonerService;
