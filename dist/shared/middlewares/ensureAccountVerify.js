"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAccountVerify;

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _Lolinfos = _interopRequireDefault(require("../../modules/lol/schemas/Lolinfos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAccountVerify(request, response, next) {
  const userId = request.user.id;
  const lol = await _Lolinfos.default.findOne({
    userId
  });

  if (!lol) {
    throw new _AppError.default('Não existe conta LoL associada a este usuário.', 400);
  }

  request.user.dataId = lol._id;
  return next();
}