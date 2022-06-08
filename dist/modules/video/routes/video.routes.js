"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _multer2 = _interopRequireDefault(require("../../../config/multer"));

var _VideoController = _interopRequireDefault(require("../controllers/VideoController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../shared/middlewares/ensureAuthenticated"));

var _ensureAccountVerify = _interopRequireDefault(require("../../../shared/middlewares/ensureAccountVerify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const videoController = new _VideoController.default();
const videoRoutes = (0, _express.Router)();
videoRoutes.get('/', videoController.list);
videoRoutes.get('/summoner/:summonerName', videoController.listBySummoner);
videoRoutes.use(_ensureAuthenticated.default);
videoRoutes.post('/', _ensureAccountVerify.default, (0, _multer.default)(_multer2.default).single('file'), videoController.upload);
var _default = videoRoutes;
exports.default = _default;