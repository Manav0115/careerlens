const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect DB
connectDB();

// CORS (FINAL WORKING)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://careerlens-omega.vercel.app"
    ],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use("/uploads", express.static(uploadDir));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/analysisRoutes"));

// Root route
app.get("/", (req, res) => {
res.send("CareerLens API is running 🚀");
});

// 404 handler
app.use((req, res) => {
res.status(404).json({ msg: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
console.error(err.message);
res.status(500).json({ msg: "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
