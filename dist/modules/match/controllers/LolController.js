"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListMatchesFromDBService = _interopRequireDefault(require("../services/ListMatchesFromDBService"));

var _UpdateMatchesService = _interopRequireDefault(require("../services/UpdateMatchesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MatchController {
  async list(request, response) {
    const {
      summonerName
    } = request.params;
    const listMatchesService = new _ListMatchesFromDBService.default();
    const result = await listMatchesService.execute(String(summonerName));
    return response.json(result);
  }

  async update(request, response) {
    const {
      puuid
    } = request.params;
    const updateMatchesService = new _UpdateMatchesService.default();
    updateMatchesService.execute(puuid);
    return response.json({
      message: 'Atualização da lista de partidas iniciada.'
    });
  }

}

var _default = MatchController;
exports.default = _default;