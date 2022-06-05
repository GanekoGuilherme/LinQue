"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MailjetEmailProvider = _interopRequireDefault(require("../../../shared/providers/email/MailjetEmailProvider"));

var _GeneratePasswordTokenProvider = require("../providers/GeneratePasswordTokenProvider");

var _RegisterPasswordService = _interopRequireDefault(require("../services/RegisterPasswordService"));

var _ResetPasswordService = _interopRequireDefault(require("../services/ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PasswordController {
  async reset(request, response) {
    const {
      email
    } = request.body;
    const mailjetEmail = new _MailjetEmailProvider.default();
    const generatePasswordTokenProvider = new _GeneratePasswordTokenProvider.GeneratePasswordTokenProvider();
    const resetPasswordService = new _ResetPasswordService.default(generatePasswordTokenProvider, mailjetEmail);
    const result = await resetPasswordService.execute(email);
    return response.json(result);
  }

  async register(request, response) {
    const {
      token
    } = request.params;
    const {
      password
    } = request.body;
    const generatePasswordTokenProvider = new _GeneratePasswordTokenProvider.GeneratePasswordTokenProvider();
    const mailjetEmail = new _MailjetEmailProvider.default();
    const registerPasswordService = new _RegisterPasswordService.default(generatePasswordTokenProvider, mailjetEmail);
    const result = await registerPasswordService.execute(token, password);
    return response.json(result);
  }

}

var _default = PasswordController;
exports.default = _default;