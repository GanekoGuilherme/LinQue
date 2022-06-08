"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _Users = _interopRequireDefault(require("../schemas/Users"));

var _bcryptjs = require("bcryptjs");

var _Lolinfos = _interopRequireDefault(require("../../lol/schemas/Lolinfos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthUserService {
  constructor(generateToken) {
    this.generateToken = generateToken;
    this.generateToken = generateToken;
  }

  async execute({
    email,
    password
  }) {
    if (!email) throw new _AppError.default('E-mail não enviado.');
    if (!password) throw new _AppError.default('Senha não enviada.');
    const checkUser = await _Users.default.findOne({
      email
    });
    if (!checkUser) throw new _AppError.default('Usuário ou senha incorretos.', 404);
    const passwordMatch = await (0, _bcryptjs.compare)(password, checkUser.password);
    if (!passwordMatch) throw new _AppError.default('Usuário ou senha incorretos.', 404);
    const token = await this.generateToken.execute(checkUser._id);
    const data = await _Lolinfos.default.findOne({
      userId: checkUser._id
    }).select('name');
    return {
      token,
      user: {
        userId: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
        summonerName: data?.name
      }
    };
  }

}

var _default = AuthUserService;
exports.default = _default;