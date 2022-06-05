"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRiotBr1 = exports.apiRiotAmericas = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const apiRiotBr1 = _axios.default.create({
  baseURL: process.env.URL_RIOT_BR1,
  headers: {
    'X-Riot-Token': String(process.env.X_Riot_Token)
  }
});

exports.apiRiotBr1 = apiRiotBr1;

const apiRiotAmericas = _axios.default.create({
  baseURL: process.env.URL_RIOT_AMERICAS,
  headers: {
    'X-Riot-Token': String(process.env.X_Riot_Token)
  }
});

exports.apiRiotAmericas = apiRiotAmericas;