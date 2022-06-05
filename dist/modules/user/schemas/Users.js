"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../../../shared/database"));

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const users = new _mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  passwordToken: {
    type: String,
    unique: true
  },
  passwordTokenExpires: {
    type: Date
  },
  passwordTokenActive: {
    type: Boolean
  },
  verify: {
    type: Boolean,
    required: true,
    default: false
  },
  userTokenActive: {
    type: String
  },
  userTokenActiveExpires: {
    type: Date
  }
}, {
  timestamps: true,
  autoCreate: true,
  versionKey: false
});
users.pre('save', async function (next) {
  const hash = await _bcryptjs.default.hash(this.password, 10);
  this.password = hash;
  next();
});

const Users = _database.default.model('Users', users);

var _default = Users;
exports.default = _default;