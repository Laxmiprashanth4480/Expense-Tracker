// config/connectDb.js
const mongoose = require("mongoose");


const connectDb = async () => {
    try {
        console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1); // stop the app if DB fails
    }
};

module.exports = connectDb;
