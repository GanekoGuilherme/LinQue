"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenerateTokenProvider = void 0;

var _auth = require("../../../config/auth");

var _jsonwebtoken = require("jsonwebtoken");

class GenerateTokenProvider {
  async execute(userId) {
    const privateKey = (0, _auth.getPrivateKey)();
    const token = (0, _jsonwebtoken.sign)({}, privateKey, {
      subject: userId,
      expiresIn: '4h'
    });
    return token;
  }

}

exports.GenerateTokenProvider = GenerateTokenProvider;