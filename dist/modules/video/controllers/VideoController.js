"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UploadVideoService = _interopRequireDefault(require("../services/UploadVideoService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VideoController {
  async upload(request, response) {
    const {
      originalname: name,
      size,
      key,
      location: url = ''
    } = request.file;
    const dataId = request.user.dataId;
    const uploadVideoService = new _UploadVideoService.default();
    const result = await uploadVideoService.execute({
      name,
      size,
      key,
      url,
      dataId
    });
    return response.json(result);
  }

}

var _default = VideoController;
exports.default = _default;