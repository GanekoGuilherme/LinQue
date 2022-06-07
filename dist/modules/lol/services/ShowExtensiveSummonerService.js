"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apis = require("../../../shared/infra/apis");

var _Lolinfos = _interopRequireDefault(require("../schemas/Lolinfos"));

var _uuid = require("uuid");

var _Matches = _interopRequireDefault(require("../../match/schemas/Matches"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowExtensiveSummonerService {
  async execute(summonerName) {
    let summoner;
    let matches;
    let league;
    summoner = await _Lolinfos.default.findOne({
      name: {
        $regex: new RegExp('^' + summonerName + '$', 'i')
      }
    });

    if (!summoner) {
      const response = await _apis.apiRiotBr1.get(`/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`).catch(error => {
        if (error?.response?.data?.status?.message === 'Data not found - summoner not found') {
          throw new _AppError.default('Invocador não encontrado.', 404);
        }

        throw new _AppError.default('Falha na comunicação com API Riot.', 500);
      });
      const response2 = await _apis.apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${response.data.id}`);
      league = response2.data;
      summoner = await _Lolinfos.default.findOneAndUpdate({
        puuid: response.data.puuid
      }, {
        $setOnInsert: {
          _id: (0, _uuid.v4)()
        },
        $set: {
          puuid: response.data.puuid,
          summonerId: response.data.id,
          name: response.data.name,
          profileIconId: response.data.profileIconId,
          revisionDate: response.data.revisionDate,
          summonerLevel: response.data.summonerLevel
        }
      }, {
        upsert: true,
        new: true
      });
    } else {
      const leagueRaw = await _apis.apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${summoner?.summonerId}`);
      league = leagueRaw.data;
    }

    const result = {
      totalWins: 0,
      totalLosses: 0,
      totalMatches: 0
    };
    league.forEach(league => {
      if (league.queueType === 'RANKED_SOLO_5x5' || league.queueType === 'RANKED_FLEX_SR') {
        result.totalWins += league.wins;
        result.totalLosses += league.losses;
        result.totalMatches += league.wins + league.losses;
      }
    });
    matches = await _Matches.default.find({
      'info.participants.summonerName': {
        $regex: new RegExp('^' + summonerName + '$', 'i')
      }
    }).sort({
      'info.gameEndTimestamp': -1
    }).limit(10);

    if (matches.length < 10) {
      matches = [];
      const response = await _apis.apiRiotAmericas.get(`/lol/match/v5/matches/by-puuid/${summoner?.puuid}/ids`, {
        params: {
          start: 0,
          count: 10
        }
      });
      const IdsMatch = response.data;
      await Promise.all(IdsMatch.map(async match => {
        const response = await _apis.apiRiotAmericas.get(`/lol/match/v5/matches/${match}`);
        const matchUpdated = await _Matches.default.findOneAndUpdate({
          matchId: match
        }, {
          $setOnInsert: {
            _id: (0, _uuid.v4)()
          },
          $set: {
            matchId: response.data.matchId,
            participants: response.data.participants,
            info: response.data.info
          }
        }, {
          upsert: true,
          new: true
        });
        matches.push(matchUpdated);
      }));
    }

    return {
      summoner,
      result,
      league,
      matches
    };
  }

}

var _default = ShowExtensiveSummonerService;
exports.default = _default;