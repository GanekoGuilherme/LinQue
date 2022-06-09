"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Videos = _interopRequireDefault(require("../schemas/Videos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListVideoService {
  async execute({
    pageRaw
  }) {
    let page = pageRaw;

    if (Number.isNaN(pageRaw) || !Number.isInteger(pageRaw) || pageRaw <= 1) {
      page = 0;
    }

    const videos = await _Videos.default.find().select('_id name url dataId createdAt').populate({
      model: 'Lolinfos',
      path: 'dataId',
      select: 'profileIconId name'
    }).sort({
      createdAt: -1
    }).skip(page * 10).limit(10);
    return videos;
  }

}

exports.default = ListVideoService;