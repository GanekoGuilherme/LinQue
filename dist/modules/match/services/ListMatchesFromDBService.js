"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matches = _interopRequireDefault(require("../schemas/Matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListMatchesFromDBService {
  async execute(summonerName) {
    try {
      const matches = await _Matches.default.find({
        'info.participants.summonerName': {
          $regex: new RegExp('^' + summonerName + '$', 'i')
        }
      }).sort({
        'info.gameEndTimestamp': -1
      }).limit(10);
      return matches;
    } catch (error) {
      if (error?.response?.data) console.log(error?.response?.data);else console.log(error);
    }
  }

}

var _default = ListMatchesFromDBService;
exports.default = _default;