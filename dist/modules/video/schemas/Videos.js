"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../../../shared/database"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const videos = new _mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  key: {
    type: String
  },
  size: {
    type: Number,
    required: true
  },
  url: {
    type: String
  },
  dataId: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  autoCreate: true,
  versionKey: false
});

const Videos = _database.default.model('Videos', videos);

var _default = Videos;
exports.default = _default;