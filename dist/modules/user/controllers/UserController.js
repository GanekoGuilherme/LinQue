"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MailjetEmailProvider = _interopRequireDefault(require("../../../shared/providers/email/MailjetEmailProvider"));

var _GenerateTokenProviders = require("../providers/GenerateTokenProviders");

var _GenerateUserTokenActiveProvider = require("../providers/GenerateUserTokenActiveProvider");

var _ActiveUserService = _interopRequireDefault(require("../services/ActiveUserService"));

var _CheckEmailUserService = _interopRequireDefault(require("../services/CheckEmailUserService"));

var _CreateUserService = _interopRequireDefault(require("../services/CreateUserService"));

var _RequestActiveUserService = _interopRequireDefault(require("../services/RequestActiveUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async store(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const generateTokenProvider = new _GenerateTokenProviders.GenerateTokenProvider();
    const createUserService = new _CreateUserService.default(generateTokenProvider);
    const result = await createUserService.execute({
      name,
      email,
      password
    });
    return response.status(201).json(result);
  }

  async checkEmail(request, response) {
    const {
      email
    } = request.params;
    const checkEmailUserService = new _CheckEmailUserService.default();
    const result = await checkEmailUserService.execute(String(email));
    return response.json(result);
  }

  async activeUser(request, response) {
    const {
      token,
      email
    } = request.body;
    const generateUserTokenActiveProvider = new _GenerateUserTokenActiveProvider.GenerateUserTokenActiveProvider();
    const mailjetEmail = new _MailjetEmailProvider.default();
    const activeUserService = new _ActiveUserService.default(generateUserTokenActiveProvider, mailjetEmail);
    const result = await activeUserService.execute(token, email);
    return response.json(result);
  }

  async requestActiveUser(request, response) {
    const {
      userId
    } = request.params;
    const generateUserTokenActiveProvider = new _GenerateUserTokenActiveProvider.GenerateUserTokenActiveProvider();
    const mailjetEmail = new _MailjetEmailProvider.default();
    const requestActiveUserService = new _RequestActiveUserService.default(generateUserTokenActiveProvider, mailjetEmail);
    const result = await requestActiveUserService.execute(userId);
    return response.json(result);
  }

}

var _default = UserController;
exports.default = _default;