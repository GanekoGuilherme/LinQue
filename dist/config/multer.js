"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _AppError = _interopRequireDefault(require("../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storageTypes = {
  local: _multer.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      _crypto.default.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');
        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    }
  }),
  s3: (0, _multerS.default)({
    s3: new _awsSdk.default.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
      region: process.env.AWS_DEFAULT_REGION
    }),
    bucket: 'projeto-linque',
    contentType: _multerS.default.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      _crypto.default.randomBytes(16, (err, hash) => {
        if (err) cb(err, '');
        const filename = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, filename);
      });
    }
  })
};
const config = {
  dest: _path.default.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['s3'],
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['video/mp4'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new _AppError.default('Tipo de arquivo inválido.', 400));
    }
  }
};
var _default = config;
exports.default = _default;