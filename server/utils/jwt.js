const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.MY_SECRET_KEY, {
    expiresIn: "3d",
  });
  return token;
};

const verifyToken = (token) => {
  const isValid = jwt.verify(token, process.env.MY_SECRET_KEY);
  return isValid;
};

module.exports = { createJWT, verifyToken };
