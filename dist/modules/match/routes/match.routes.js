"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _LolController = _interopRequireDefault(require("../controllers/LolController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const matchController = new _LolController.default();
const matchRoutes = (0, _express.Router)();
matchRoutes.get('/list/:summonerName', matchController.list);
matchRoutes.post('/update/:puuid', matchController.update);
var _default = matchRoutes;
exports.default = _default;