const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Ensure uploads directory exists on startup
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect to MongoDB
connectDB();

// CORS — allow the React dev server
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/analysisRoutes"));

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "CareerLens API running" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ msg: "Internal server error" });
});
app.get("/", (req, res) => {
  res.send("CareerLens API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});