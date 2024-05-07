const logger = require("./loggingEngine");
const messages = require("../constants/responseMessages.json");

exports.invalidEndPoint = () => {
  const error = new Error("Invalid Endpoint!");
  error.statusCode = 404;
  error.serverStatus = 404;
  throw error;
};

exports.createError = (statusCode, data = {}) => {
  let error = new Error(messages[statusCode]);
  error.statusCode = statusCode;
  error.data = data;
  return error;
};

exports.makeErrorResponse = (error) => {
  let status = error.statusCode || 500;
  let message = error.message || "Server Error";

  if (status == 500) message = `We couldn't able to complete your request`;

  const data = error.data || {};

  logger.error({
    message: message,
    serverCode: status,
    dataTime: new Date(),
  });

  let response = { status: false, code: status, message: message, data: data };
  return response;
};

exports.validate = (parameters, requestBody) => {
  response = [];
  parameters.forEach((param) => {
    if (
      !(param in requestBody) ||
      requestBody[param] == null ||
      requestBody[param].toString().toUpperCase() == "NULL" ||
      requestBody[param].toString().length == 0
    ) {
      response.push(param);
    }
  });

  if (response.length != 0)
    throw {
      data: { missingParameters: response },
      message: "Missing Parameters",
      serverStatus: 400,
      statusCode: 400,
    };

  return response;
};
