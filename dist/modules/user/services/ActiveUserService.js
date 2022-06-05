"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _Users = _interopRequireDefault(require("../schemas/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ActiveUserService {
  constructor(generateUserTokenActive, mailjetEmail) {
    this.generateUserTokenActive = generateUserTokenActive;
    this.mailjetEmail = mailjetEmail;
    this.generateUserTokenActive = generateUserTokenActive;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(token, email) {
    let message = '';
    const user = await _Users.default.findOne({
      email
    });
    if (!user) throw new _AppError.default('Falha na ativação do usuário.', 400);
    const dateNow = new Date();

    if (user.verify) {
      message = 'Este usuário já está ativo.';
    } else if (user.userTokenActive && user.userTokenActive === token && dateNow <= user.userTokenActiveExpires) {
      await _Users.default.updateOne({
        _id: user._id
      }, {
        verify: true
      });
      message = 'Usuário ativado com sucesso.';
    } else {
      const token = await this.generateUserTokenActive.execute();
      dateNow.setHours(dateNow.getHours() + 1);
      await this.mailjetEmail.sendEmailToActiveUser({
        email,
        name: user.name,
        token
      });
      await _Users.default.updateOne({
        _id: user._id
      }, {
        userTokenActive: token,
        userTokenActiveExpires: dateNow
      });
      message = `Falha na ativação do usuário. Um novo token foi enviado ao e-mail ${email}`;
    }

    return {
      message
    };
  }

}

var _default = ActiveUserService;
exports.default = _default;