const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = verified.user_id;

    next();
  } catch (err) {
    res
      .status(400)
      .send({
        code: 1001,
        message: "Invalid Auth token",
        data: {},
        status: false,
      });
  }
};

module.exports = authenticateToken;
