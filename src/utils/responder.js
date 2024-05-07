const logger = require("../utils/loggingEngine");
const messages = require("../constants/responseMessages.json");

module.exports = (req, res, next, status, messageCode, data) => {
  logger.info({ status: status, message: messages[messageCode], data: data });
  res.status(200).json({
    status: status,
    code: messageCode,
    message: messages[messageCode],
    data: data,
  });
};
