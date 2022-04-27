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
    let summoner: IResume | null;
    let matches: any;
    let league: any;

    summoner = await Lolinfos.findOne({ name: { $regex: new RegExp('^' + summonerName + '$', 'i') } });

    if (!summoner) {
      const response = await apiRiotBr1.get(`/lol/summoner/v4/summoners/by-name/${summonerName}`);
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
    } else {
      const leagueRaw = await apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${summoner?.summonerId}`);
      league = leagueRaw.data;
    }

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

    return { summoner, result, league, matches };
  }
}

export default ShowExtensiveSummonerService;
