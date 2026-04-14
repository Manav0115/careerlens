const express = require("express");
const router = express.Router();

const {
  analyse,
  getHistory,
  getAnalysisById,
} = require("../controllers/analysisController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Multer error handler
const handleUpload = (req, res, next) => {
  const uploadSingle = upload.single("resume");
  uploadSingle(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ msg: "File too large. Maximum size is 5MB." });
      }
      return res.status(400).json({ msg: err.message || "File upload error" });
    }
    next();
  });
};

// POST /api/analyse
router.post("/analyse", authMiddleware, handleUpload, analyse);

// GET /api/history
router.get("/history", authMiddleware, getHistory);

// GET /api/analysis/:id
router.get("/analysis/:id", authMiddleware, getAnalysisById);

module.exports = router;