const argon2 = require("argon2");

const hashPassword = async (rawPassword) => {
  const hashedPassword = await argon2.hash(rawPassword);
  return hashedPassword;
};

const verifyPassword = async (hashedPassword, rawPassword) => {
  const isValid = await argon2.verify(hashedPassword, rawPassword);
  return isValid;
};

module.exports = { hashPassword, verifyPassword };
