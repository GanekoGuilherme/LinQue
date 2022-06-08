"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ShowResumeSummonerService = _interopRequireDefault(require("../services/ShowResumeSummonerService"));

var _ShowExtensiveSummonerService = _interopRequireDefault(require("../services/ShowExtensiveSummonerService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LolController {
  async showStatusMatches(request, response) {
    const {
      dataId
    } = request.params;
    const showResumeSummonerService = new _ShowResumeSummonerService.default();
    const result = await showResumeSummonerService.execute(String(dataId));
    return response.json(result);
  }

  async showExtensive(request, response) {
    const {
      summonerName
    } = request.params;
    const showExtensiveSummonerService = new _ShowExtensiveSummonerService.default();
    const result = await showExtensiveSummonerService.execute(String(summonerName));
    return response.json(result);
  }

}

var _default = LolController;
exports.default = _default;