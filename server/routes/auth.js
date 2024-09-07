const express = require("express");
const User = require("../models/user");

const { createJWT } = require("../utils/jwt");
const { hashPassword, verifyPassword } = require("../utils/password");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { userName, email, password, role } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    const token = createJWT({
      _id: newUser._id,
      role: newUser.role,
    });

    return res.status(200).json({ user: newUser, token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(400).json({ message: "Error on register from server" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await verifyPassword(user.password, password);
    if (isValid) {
      const token = createJWT({ _id: user._id, role: user.role });
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error while login in server" });
  }
});

module.exports = router;
