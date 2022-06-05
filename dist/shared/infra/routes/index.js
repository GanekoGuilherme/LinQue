"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("../../../modules/user/routes/auth.routes"));

var _lol = _interopRequireDefault(require("../../../modules/lol/routes/lol.routes"));

var _match = _interopRequireDefault(require("../../../modules/match/routes/match.routes"));

var _user = _interopRequireDefault(require("../../../modules/user/routes/user.routes"));

var _password = _interopRequireDefault(require("../../../modules/user/routes/password.routes"));

var _video = _interopRequireDefault(require("../../../modules/video/routes/video.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/auth', _auth.default);
routes.use('/password', _password.default);
routes.use('/lol', _lol.default); //list all

routes.use('/matches', _match.default);
routes.use('/users', _user.default);
routes.use('/video', _video.default);
var _default = routes;
exports.default = _default;