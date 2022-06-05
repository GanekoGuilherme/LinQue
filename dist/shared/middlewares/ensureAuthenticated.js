"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = require("../../config/auth");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('JWT is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const publicKey = (0, _auth.getPublicKey)();
    const decoded = (0, _jsonwebtoken.verify)(token, publicKey);
    const {
      sub
    } = decoded;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT', 401);
  }
}