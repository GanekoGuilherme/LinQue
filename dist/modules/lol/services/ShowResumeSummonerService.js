"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Lolinfos = _interopRequireDefault(require("../schemas/Lolinfos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowResumeSummonerService {
  async execute(dataId) {
    const data = await _Lolinfos.default.findOne({
      _id: dataId
    }).select('statusMatchesUpdate');
    return {
      statusMatchesUpdate: data?.statusMatchesUpdate || 'SEM_REQUISIÇÃO'
    };
  }

}

var _default = ShowResumeSummonerService;
exports.default = _default;