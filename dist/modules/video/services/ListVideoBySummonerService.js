"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _Videos = _interopRequireDefault(require("../schemas/Videos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListVideoBySummonerService {
  async execute({
    dataId,
    pageRaw
  }) {
    if (!dataId) {
      throw new _AppError.default('Id não enviado.', 400);
    }

    let page = pageRaw;

    if (Number.isNaN(pageRaw) || !Number.isInteger(pageRaw) || pageRaw <= 1) {
      page = 0;
    }

    const videos = await _Videos.default.find({
      dataId
    }).select('_id name url dataId createdAt').populate({
      model: 'Lolinfos',
      path: 'dataId',
      select: 'profileIconId name'
    }).sort({
      createdAt: -1
    }).skip(page * 10).limit(10);
    return videos;
  }

}

exports.default = ListVideoBySummonerService;