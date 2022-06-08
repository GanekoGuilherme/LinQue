"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lolinfos = _interopRequireDefault(require("../../lol/schemas/Lolinfos"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _apis = require("../../../shared/infra/apis");

var _uuid = require("uuid");

var _Videos = _interopRequireDefault(require("../schemas/Videos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListVideoBySummonerService {
  async execute({
    summonerName,
    pageRaw
  }) {
    let page = pageRaw;

    if (Number.isNaN(pageRaw) || !Number.isInteger(pageRaw) || pageRaw <= 1) {
      page = 0;
    }

    const response = await _apis.apiRiotBr1.get(`/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`).catch(error => {
      if (error?.response?.data?.status?.message === 'Data not found - summoner not found') {
        throw new _AppError.default('Invocador não encontrado.', 404);
      }

      throw new _AppError.default('Falha na comunicação com API Riot.', 500);
    });
    const summoner = await _Lolinfos.default.findOneAndUpdate({
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
    const videos = await _Videos.default.find({
      dataId: summoner._id
    }).select('_id name url').sort({
      createdAt: -1
    }).skip(page * 10).limit(10);
    return videos;
  }

}

exports.default = ListVideoBySummonerService;