"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../../../shared/database"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lolinfos = new _mongoose.Schema({
  _id: {
    type: String
  },
  userId: {
    type: String,
    required: true,
    default: ''
  },
  puuid: {
    type: String,
    required: true,
    unique: true
  },
  summonerId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  profileIconId: {
    type: String
  },
  revisionDate: {
    type: Number
  },
  summonerLevel: {
    type: String
  },
  statusMatchesUpdate: {
    type: String
  }
}, {
  timestamps: true,
  autoCreate: true,
  versionKey: false
});

const Lolinfos = _database.default.model('Lolinfos', lolinfos);

var _default = Lolinfos;
exports.default = _default;