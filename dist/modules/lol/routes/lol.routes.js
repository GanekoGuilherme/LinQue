"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _LolController = _interopRequireDefault(require("../controllers/LolController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lolController = new _LolController.default();
const lolRoutes = (0, _express.Router)();
lolRoutes.get('/resume/:dataId', lolController.showStatusMatches);
lolRoutes.get('/extensive/:summonerName', lolController.showExtensive);
var _default = lolRoutes;
exports.default = _default;