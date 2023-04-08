const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const createToken = (payload) => {
  console.log("createToken", payload);
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
  console.log("token", token);
  return token;
};

const verifyJwtToken = (token, next) => {
  try {
    const verifyToken = jwt.verify(token, JWT_SECRET);
    console.log("verifyToken", verifyToken);

    return verifyToken.userId;
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createToken,
  verifyJwtToken,
};
