"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GenerateTokenProviders = require("../providers/GenerateTokenProviders");

var _AuthUserService = _interopRequireDefault(require("../services/AuthUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {
  async auth(request, response) {
    const {
      email,
      password
    } = request.body;
    const generateTokenProvider = new _GenerateTokenProviders.GenerateTokenProvider();
    const authUserService = new _AuthUserService.default(generateTokenProvider);
    const result = await authUserService.execute({
      email,
      password
    });
    return response.json(result);
  }

}

var _default = AuthController;
exports.default = _default;