"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../../../shared/database"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const matches = new _mongoose.Schema({
  _id: {
    type: String
  },
  matchId: {
    type: String,
    required: true,
    unique: true
  },
  info: {
    gameCreation: Number,
    gameDuration: Number,
    gameEndTimestamp: Number,
    gameId: Number,
    gameMode: String,
    gameName: String,
    gameStartTimestamp: Number,
    gameType: String,
    gameVersion: String,
    mapId: Number,
    participants: [{
      _id: false,
      type: Object
    }],
    platformId: String,
    queueId: Number,
    teams: [{
      _id: false,
      type: Object
    }],
    tournamentCode: String
  }
}, {
  timestamps: true,
  autoCreate: true,
  versionKey: false
});

const Matches = _database.default.model('Matches', matches);

var _default = Matches;
exports.default = _default;