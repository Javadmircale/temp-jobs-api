const notFoundMiddleware = require("./not-found");
const errorHandlerMiddleware = require("./error-handler");
const authenticated = require("./authentication");
module.exports = { notFoundMiddleware, errorHandlerMiddleware, authenticated };
