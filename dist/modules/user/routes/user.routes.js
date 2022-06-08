"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userController = new _UserController.default();
const userRoutes = (0, _express.Router)();
userRoutes.post('/create', userController.store);
userRoutes.post('/validate-email', userController.checkEmail);
userRoutes.post('/active-user', userController.activeUser);
userRoutes.post('/request-active-user/:userId', userController.requestActiveUser);
var _default = userRoutes;
exports.default = _default;