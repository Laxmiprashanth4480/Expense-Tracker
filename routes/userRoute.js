// routes/userRoute.js
const express = require("express");
const { loginController, registerController } = require("../controllers/userController");

const router = express.Router();

// Health check (optional, helps you verify wiring quickly)
router.get("/health", (req, res) => res.json({ ok: true, scope: "users" }));

// POST /api/v1/users/register
router.post("/register", registerController);

// POST /api/v1/users/login
router.post("/login", loginController);

module.exports = router;
