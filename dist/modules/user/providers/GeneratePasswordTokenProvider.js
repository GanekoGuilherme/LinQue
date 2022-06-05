"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeneratePasswordTokenProvider = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GeneratePasswordTokenProvider {
  async execute() {
    const token = _crypto.default.randomBytes(20).toString('hex');

    return token;
  }

}

exports.GeneratePasswordTokenProvider = GeneratePasswordTokenProvider;