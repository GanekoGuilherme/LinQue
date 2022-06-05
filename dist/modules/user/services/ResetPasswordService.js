"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _Users = _interopRequireDefault(require("../schemas/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordService {
  constructor(generatePasswordTokenProvider, mailjetEmail) {
    this.generatePasswordTokenProvider = generatePasswordTokenProvider;
    this.mailjetEmail = mailjetEmail;
    this.generatePasswordTokenProvider = generatePasswordTokenProvider;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(email) {
    const user = await _Users.default.findOne({
      email
    });
    if (!user) throw new _AppError.default('Usuário não encontrado.', 404);
    const token = await this.generatePasswordTokenProvider.execute();
    const dateTokenExpires = new Date();
    dateTokenExpires.setHours(dateTokenExpires.getHours() + 1);
    await this.mailjetEmail.sendEmailToResetPassword({
      email,
      name: user.name,
      token
    });
    await _Users.default.updateOne({
      _id: user._id
    }, {
      passwordToken: token,
      passwordTokenExpires: dateTokenExpires,
      passwordTokenActive: true
    });
    return {
      message: `Link para a redefinir senha enviado no e-mail ${email}.`
    };
  }

}

var _default = ResetPasswordService;
exports.default = _default;