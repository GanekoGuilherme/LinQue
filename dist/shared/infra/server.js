"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("../../config/bootstrap");

require("express-async-errors");

var _routes = _interopRequireDefault(require("./routes"));

var _HandleError = _interopRequireDefault(require("../errors/HandleError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((error, request, response, next) => {
  console.log(error);

  _HandleError.default.handleError({
    error,
    request,
    response
  });
});
app.listen(process.env.PORT || 3000, () => console.log('Server is runnning on port 3000'));