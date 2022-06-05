"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPublicKey = exports.getPrivateKey = void 0;

var _AppError = _interopRequireDefault(require("../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPrivateKey = () => {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  if (!privateKey) {
    console.log('PRIVATE_KEY não encontrada.');
    throw new _AppError.default('Erro Interno', 500);
  }

  return privateKey;
};

exports.getPrivateKey = getPrivateKey;

const getPublicKey = () => {
  const publicKey = process.env.JWT_PUBLIC_KEY;

  if (!publicKey) {
    console.log('PUBLIC_KEY não encontrada.');
    throw new _AppError.default('Erro Interno', 500);
  }

  return publicKey;
};

exports.getPublicKey = getPublicKey;