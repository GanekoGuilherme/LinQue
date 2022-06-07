"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apis = require("../../../shared/infra/apis");

var _Lolinfos = _interopRequireDefault(require("../schemas/Lolinfos"));

var _uuid = require("uuid");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowResumeSummonerService {
  async execute(summonerName) {
    const response = await _apis.apiRiotBr1.get(`/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`).catch(error => {
      if (error?.response?.data?.status?.message === 'Data not found - summoner not found') {
        throw new _AppError.default('Invocador não encontrado.', 404);
      }

      throw new _AppError.default('Falha na comunicação com API Riot.', 500);
    });
    const response2 = await _apis.apiRiotBr1.get(`/lol/league/v4/entries/by-summoner/${response.data.id}`);
    const result = {
      totalWins: 0,
      totalLosses: 0,
      totalMatches: 0
    };
    response2.data.forEach(league => {
      if (league.queueType === 'RANKED_SOLO_5x5' || league.queueType === 'RANKED_FLEX_SR') {
        result.totalWins += league.wins;
        result.totalLosses += league.losses;
        result.totalMatches += league.wins + league.losses;
      }
    });
    await _Lolinfos.default.findOneAndUpdate({
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
      upsert: true
    });
    return {
      summoner: response.data,
      result,
      league: response2.data
    };
  }

}

var _default = ShowResumeSummonerService;
exports.default = _default;