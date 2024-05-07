const errorHandler = require("../utils/error");
const apiResponder = require("../utils/responder");

const userModel = require("../models/user");

const general = require("../utils/general");

const hasher = require("wordpress-hash-node");
const jwt = require("jsonwebtoken");

exports.createNewUser = async (request, response, next) => {
  try {
    errorHandler.validate(["username", "password"], request.body);

    const { username, password } = request.body;

    const existingUser = await userModel.findOne({
      attributes: ["u_id"],
      where: { u_username: username },
    });

    if (existingUser) throw errorHandler.createError(4000);

    await userModel.create({
      u_username: username,
      u_password: hasher.HashPassword(password),
      u_email: `${username}@gmail.com`,
    });

    // WE CAN SMS AND NOTIFICAATION OR WE CAN IMPLEMENT OTP VERIFICATION ALSO

    return apiResponder(request, response, next, true, 2000, {});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.verifyAuth = async (request, response, next) => {
  try {
    errorHandler.validate(["username", "password"], request.body);

    const { username, password } = request.body;

    let user = await userModel.findOne({
      attributes: ["u_id", ["u_password", "password"]],
      where: { u_username: username },
    });

    if (!user) throw errorHandler.createError(4001);

    user = general.jsonParse(user);

    let checkPass = hasher.CheckPassword(password, user.password);

    if (!checkPass) throw errorHandler.createError(4002);

    let parseData = {
      user_id: user.u_id,
      username: username,
    };

    let jwtToken = jwt.sign(parseData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return apiResponder(request, response, next, true, 2000, {
      user_id: user.u_id,
      auth_token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
