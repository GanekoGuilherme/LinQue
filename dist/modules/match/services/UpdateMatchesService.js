"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lolinfos = _interopRequireDefault(require("../../lol/schemas/Lolinfos"));

var _apis = require("../../../shared/infra/apis");

var _Matches = _interopRequireDefault(require("../schemas/Matches"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateMatchesService {
  async execute(puuid) {
    try {
      await _Lolinfos.default.updateOne({
        puuid
      }, {
        statusMatchesUpdate: 'PROGRESS'
      });
      const response = await _apis.apiRiotAmericas.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
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
      }));
      await _Lolinfos.default.updateOne({
        puuid
      }, {
        statusMatchesUpdate: 'DONE'
      });
    } catch (error) {
      if (error?.response?.data) console.log(error?.response?.data);else console.log(error);
      await _Lolinfos.default.updateOne({
        puuid
      }, {
        statusMatchesUpdate: 'FAILURE'
      });
    }
  }

}

var _default = UpdateMatchesService;
exports.default = _default;