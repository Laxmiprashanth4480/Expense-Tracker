// controllers/chatbotCtrl.js
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // put your working key in .env
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  const { data } = await axios.post(
    url,
    { contents: [{ parts: [{ text: prompt }] }] },
    { headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY } }
  );
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
}

async function handleChatbot(req, res) {
  try {
    const { message, userid } = req.body || {};
    if (!message || !userid) {
      return res.status(400).json({ error: "Message and userid are required" });
    }
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Server misconfigured: GEMINI_API_KEY is missing" });
    }
    const reply = await callGemini(message);
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini chat error:", error.response?.status, error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to get a response from Gemini",
      details: error.response?.data?.error?.message || error.message,
    });
  }
}

async function handleAnalysis(req, res) {
  try {
    const { type, data, userid } = req.body || {};
    if (!type || !data || !userid) {
      return res.status(400).json({ error: "Type, data, and userid are required" });
    }
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Server misconfigured: GEMINI_API_KEY is missing" });
    }
    const prompt =
      type === "transaction"
        ? `Analyze these financial transactions:\n${JSON.stringify(data)}`
        : `Analyze this data:\n${JSON.stringify(data)}`;
    const reply = await callGemini(prompt);
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini analysis error:", error.response?.status, error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to generate analysis with Gemini",
      details: error.response?.data?.error?.message || error.message,
    });
  }
}

// ✅ Correct CommonJS export:
module.exports = { handleChatbot, handleAnalysis };
