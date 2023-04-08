const {
  AUTH_HEADER_MISSING_ERR,
  AUTH_TOKEN_MISSING_ERR,
  USER_NOT_FOUND_ERR,
} = require("../utils/constant");
const { verifyJwtToken } = require("../utils/token");

const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    // check for auth header from client
    const header = req.headers.authorization;

    if (!header) {
      next({ status: 403, message: AUTH_HEADER_MISSING_ERR });
      return;
    }

    // verify  auth token

    const token = header.split("Bearer ")[1];
    console.log("token", token);

    if (!token) {
      next({ status: 403, message: AUTH_TOKEN_MISSING_ERR });
      return;
    }

    const userId = verifyJwtToken(token, next);
    console.log("userId", userId);
    if (!userId) {
      next({ status: 403, message: JWT_DECODE_ERR });
      return;
    }

    const user = await User.findOne(userId);

    if (!user) {
      next({ status: 404, message: USER_NOT_FOUND_ERR });
      return;
    }
    res.locals.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
