const { verifyToken } = require("../utils/jwt");
const dotenv = require("dotenv");
dotenv.config();

const checkValidation = async (req, res, next) => {
  const authentication = req.headers["authorization"];
  
  // Check if authorization header is present
  if (!authentication) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  const token = authentication.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    // Verify token and get user details
    const user = verifyToken(token);

    // Attach user to req object
    req.user = user;
    next();
  } catch (error) {
    // Handle token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid token. Please log in again." });
  }
};

module.exports = checkValidation;
