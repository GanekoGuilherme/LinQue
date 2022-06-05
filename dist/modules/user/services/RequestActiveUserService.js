"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _Users = _interopRequireDefault(require("../schemas/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestActiveUserService {
  constructor(generateUserTokenActive, mailjetEmail) {
    this.generateUserTokenActive = generateUserTokenActive;
    this.mailjetEmail = mailjetEmail;
    this.generateUserTokenActive = generateUserTokenActive;
    this.mailjetEmail = mailjetEmail;
  }

  async execute(userId) {
    const user = await _Users.default.findOne({
      _id: userId
    });
    if (!user) throw new _AppError.default('Usuário não encontrado.', 404);
    const token = await this.generateUserTokenActive.execute();
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 1);
    await this.mailjetEmail.sendEmailToActiveUser({
      email: user.email,
      name: user.name,
      token
    });
    await _Users.default.updateOne({
      _id: user._id
    }, {
      userTokenActive: token,
      userTokenActiveExpires: dateNow
    });
    return {
      message: `Token para ativação do usuário enviado no e-mail ${user.email}.`
    };
  }

}

var _default = RequestActiveUserService;
exports.default = _default;