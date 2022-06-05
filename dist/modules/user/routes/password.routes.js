"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _PasswordController = _interopRequireDefault(require("../controllers/PasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordController = new _PasswordController.default();
const passwordRoutes = (0, _express.Router)();
passwordRoutes.post('/reset', passwordController.reset);
passwordRoutes.post('/register/:token', passwordController.register);
var _default = passwordRoutes;
exports.default = _default;