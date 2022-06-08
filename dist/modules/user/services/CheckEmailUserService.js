"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _Users = _interopRequireDefault(require("../schemas/Users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CheckEmailUserService {
  async execute(email) {
    if (!email) {
      throw new _AppError.default('E-mail não enviado.', 400);
    }

    const checkEmail = await _Users.default.findOne({
      email
    });
    if (checkEmail) throw new _AppError.default('E-mail indisponível.', 400);
    return {
      message: 'E-mail disponível.'
    };
  }

}

var _default = CheckEmailUserService;
exports.default = _default;