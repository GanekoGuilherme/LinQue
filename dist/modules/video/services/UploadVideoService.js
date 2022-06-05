"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _uuid = require("uuid");

var _Videos = _interopRequireDefault(require("../schemas/Videos"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UploadVideoService {
  async execute({
    name,
    size,
    key,
    url,
    dataId
  }) {
    if (!dataId) {
      throw new _AppError.default('DataId não encontrado.', 400);
    }

    const video = await _Videos.default.create({
      _id: (0, _uuid.v4)(),
      name,
      size,
      key,
      url,
      dataId
    });
    return video;
  }

}

exports.default = UploadVideoService;