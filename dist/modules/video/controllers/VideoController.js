"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListVideoBySummonerService = _interopRequireDefault(require("../services/ListVideoBySummonerService"));

var _ListVideoService = _interopRequireDefault(require("../services/ListVideoService"));

var _UploadVideoService = _interopRequireDefault(require("../services/UploadVideoService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VideoController {
  async list(request, response) {
    const {
      page
    } = request.query;
    const listVideoService = new _ListVideoService.default();
    const result = await listVideoService.execute({
      pageRaw: Number(page)
    });
    return response.json({
      items: result
    });
  }

  async listBySummoner(request, response) {
    const {
      summonerName
    } = request.params;
    const {
      page
    } = request.query;
    const listVideoBySummonerService = new _ListVideoBySummonerService.default();
    const result = await listVideoBySummonerService.execute({
      summonerName,
      pageRaw: Number(page)
    });
    return response.json({
      items: result
    });
  }

  async upload(request, response) {
    const {
      originalname: name,
      size,
      key,
      location: url = ''
    } = request.file;
    const dataId = request.user.dataId;
    const uploadVideoService = new _UploadVideoService.default();
    const result = await uploadVideoService.execute({
      name,
      size,
      key,
      url,
      dataId
    });
    return response.json(result);
  }

}

var _default = VideoController;
exports.default = _default;