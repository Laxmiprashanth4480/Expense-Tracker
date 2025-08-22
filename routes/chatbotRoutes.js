const express = require("express");
const { handleChatbot, handleAnalysis } = require("../controllers/chatbotCtrl");

// router object
const router = express.Router();

// Routes for chatbot
// Handle chatbot interaction (text-based message)
router.post("/chat", handleChatbot);

// Handle chatbot analysis (e.g., transaction analysis)
router.post("/analyze", handleAnalysis);

module.exports = router;
