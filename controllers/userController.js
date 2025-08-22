const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// POST /api/v1/users/login
const loginController = async (req, res, next) => {
  try {
    let { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    email = String(email).trim().toLowerCase();
    password = String(password).trim();

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/users/register
const registerController = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body || {};

    const finalName = (username || name || "").toString().trim();
    const finalEmail = (email || "").toString().trim().toLowerCase();
    const finalPassword = (password || "").toString().trim();

    if (!finalName || !finalEmail || !finalPassword) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const exists = await userModel.findOne({ email: finalEmail });
    if (exists) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }

    const hashed = await bcrypt.hash(finalPassword, 10);

    const newUser = await userModel.create({
      name: finalName,
      email: finalEmail,
      password: hashed,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const details = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validation failed", details });
    }
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Email already registered." });
    }
    next(err);
  }
};

module.exports = { loginController, registerController };
