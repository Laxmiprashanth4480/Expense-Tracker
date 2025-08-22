require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// DB connector
const connectDb = require("./config/connectDb");

// Route modules
const userRoutes = require("./routes/userRoute");
const transactionRoutes = require("./routes/transactionRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

// Connect to MongoDB
connectDb();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, service: "expense-tracker-api" });
});

// API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);

// 404 handler (for unmatched routes)
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.message);
  if (err.stack) console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// Port (use 5000 by default for your dev setup)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
