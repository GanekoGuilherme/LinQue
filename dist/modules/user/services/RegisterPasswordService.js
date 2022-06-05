"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Users = _interopRequireDefault(require("../schemas/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RegisterPasswordService {
  constructor(generatePasswordTokenProvider, mailjetEmail) {
    this.generatePasswordTokenProvider = generatePasswordTokenProvider;
    this.mailjetEmail = mailjetEmail;
    this.generatePasswordTokenProvider = generatePasswordTokenProvider;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(passwordToken, password) {
    let message = '';
    const user = await _Users.default.findOne({
      passwordToken
    });
    if (!user) throw new _AppError.default('Token inválido.', 400);
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])[@!#$%^&*+\-.,;_:'~()/\\a-zA-Z\d]{8,16}$/;

    if (!pattern.test(password)) {
      throw new _AppError.default('Senha inválida.', 400);
    }

    const dateNow = new Date();

    if (!user.passwordTokenActive) {
      throw new _AppError.default('Não é possível redefinir senha deste usuário.', 400);
    } else if (user.passwordTokenExpires && dateNow <= user.passwordTokenExpires) {
      const hash = await _bcryptjs.default.hash(password, 10);
      await _Users.default.updateOne({
        _id: user._id
      }, {
        passwordTokenActive: false,
        password: hash
      });
      message = 'Senha redefinida com sucesso.';
    } else {
      const token = await this.generatePasswordTokenProvider.execute();
      dateNow.setHours(dateNow.getHours() + 1);
      await this.mailjetEmail.sendEmailToResetPassword({
        email: user.email,
        name: user.name,
        token
      });
      await _Users.default.updateOne({
        _id: user._id
      }, {
        passwordToken: token,
        passwordTokenExpires: dateNow
      });
      throw new _AppError.default('Tempo expirado para redefinir a senha deste usuário. Um novo token foi enviado ao e-mail.', 400);
    }

    return {
      message
    };
  }

}

var _default = RegisterPasswordService;
exports.default = _default;