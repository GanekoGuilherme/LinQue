"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _Users = _interopRequireDefault(require("../schemas/Users"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateUserService {
  constructor(generateToken) {
    this.generateToken = generateToken;
    this.generateToken = generateToken;
  }

  async execute({
    name,
    email,
    password
  }) {
    if (!name) throw new _AppError.default('Nome não enviado.');
    if (!email) throw new _AppError.default('E-mail não enviado.');
    if (!password) throw new _AppError.default('Senha não enviada.');
    const checkEmail = await _Users.default.findOne({
      email
    });
    if (checkEmail) throw new _AppError.default('E-mail indisponível.', 400);
    const minLength = password.length >= 8;
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /[0-9]/.test(password);
    const containsSpecial = /\W|_/.test(password);

    if (!(minLength && containsLetter && containsNumber && containsSpecial)) {
      throw new _AppError.default('Senha Inválida.', 400);
    }

    const user = await _Users.default.create({
      _id: (0, _uuid.v4)(),
      name,
      email,
      password,
      verify: false,
      passwordToken: (0, _uuid.v4)()
    });
    const token = await this.generateToken.execute(user._id);
    return {
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email
      }
    };
  }

}

var _default = CreateUserService;
exports.default = _default;