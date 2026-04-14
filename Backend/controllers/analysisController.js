const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const Analysis = require("../models/Analysis");
const scoreCalculator = require("../utils/scoreCalculator");
const resumeParser = require("../utils/resumeParser");

// Role → required skills mapping (mirrors frontend roleSkills.ts)
const ROLE_SKILLS = {
  "DevOps Engineer": [
    "Docker","Kubernetes","CI/CD","Linux","AWS","Terraform","Ansible","Jenkins","Git","Monitoring",
  ],
  "Frontend Developer": [
    "React","TypeScript","CSS","HTML","JavaScript","Redux","Webpack","REST API","Git","Figma",
  ],
  "Backend Developer": [
    "Node.js","Express","SQL","MongoDB","REST API","JWT","Docker","Git","Python","Redis",
  ],
  "Data Scientist": [
    "Python","Pandas","NumPy","Scikit-learn","SQL","Matplotlib","Statistics","Machine Learning","Jupyter","TensorFlow",
  ],
  "ML Engineer": [
    "TensorFlow","PyTorch","Python","ML Pipelines","Docker","REST API","NumPy","Statistics","Git","Cloud",
  ],
  "Cloud Architect": [
    "AWS","Azure","GCP","Terraform","Kubernetes","Networking","Security","CI/CD","Docker","Cost Optimisation",
  ],
  "Full Stack Developer": [
    "React","Node.js","Express","SQL","MongoDB","TypeScript","Docker","Git","REST API","GraphQL",
  ],
  "Android Developer": [
    "Kotlin","Java","Android Studio","Firebase","REST API","MVVM","Jetpack Compose","Git","SQL","Testing",
  ],
  "Cybersecurity Engineer": [
    "Pentesting","Linux","Networking","Firewalls","SIEM","OWASP","Python","SOC","Incident Response","Cryptography",
  ],
  "UI/UX Designer": [
    "Figma","Prototyping","Wireframing","User Research","Design Systems","CSS","HTML","Accessibility","Sketch","Usability Testing",
  ],
};

// Clean up uploaded file
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error("File cleanup error:", err.message);
  }
};

// @route   POST /api/analyse
// @access  Private
exports.analyse = async (req, res) => {
  const filePath = req.file ? req.file.path : null;

  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const { role } = req.body;

    if (!role) {
      deleteFile(filePath);
      return res.status(400).json({ msg: "Job role is required" });
    }

    const skills = ROLE_SKILLS[role];
    if (!skills) {
      deleteFile(filePath);
      return res
        .status(400)
        .json({ msg: `Unknown role: ${role}. Please select a valid job role.` });
    }

    // Validate file type
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const allowedExts = [".pdf", ".doc", ".docx"];
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    if (
      !allowedMimeTypes.includes(req.file.mimetype) &&
      !allowedExts.includes(fileExt)
    ) {
      deleteFile(filePath);
      return res
        .status(400)
        .json({ msg: "Invalid file type. Please upload a PDF, DOC, or DOCX." });
    }

    // Parse resume text
    let resumeText = "";
    try {
      resumeText = await resumeParser(filePath);
    } catch (parseErr) {
      console.error("Resume parse error:", parseErr.message);
      deleteFile(filePath);
      return res
        .status(422)
        .json({ msg: "Could not read the file. Please upload a text-based PDF." });
    }

    if (!resumeText || resumeText.trim().length < 50) {
      deleteFile(filePath);
      return res.status(422).json({
        msg: "Resume appears to be empty or unreadable. Please upload a text-based PDF.",
      });
    }

    // Calculate score
    const { matched, missing, score } = scoreCalculator(resumeText, skills);

    // Persist result to DB
    const analysis = await Analysis.create({
      userId: req.user,
      role,
      fileName: req.file.originalname,
      score,
      matched,
      missing,
    });

    // Clean up temp file
    deleteFile(filePath);

    // Format date
    const date = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    res.status(201).json({
      success: true,
      role,
      score,
      matched,
      missing,
      date,
      fileName: req.file.originalname,
      analysisId: analysis._id,
    });
  } catch (err) {
    console.error("Analysis error:", err.message);
    deleteFile(filePath);
    res.status(500).json({ msg: "Server error during analysis" });
  }
};

// @route   GET /api/history
// @access  Private
exports.getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("-__v");

    const history = analyses.map((a) => ({
      id: a._id,
      role: a.role,
      fileName: a.fileName,
      score: a.score,
      matched: a.matched.length,
      missing: a.missing.length,
      date: new Date(a.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    }));

    res.json({ history });
  } catch (err) {
    console.error("History error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// @route   GET /api/analysis/:id
// @access  Private
exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      userId: req.user,
    });

    if (!analysis) {
      return res.status(404).json({ msg: "Analysis not found" });
    }

    res.json({
      id: analysis._id,
      role: analysis.role,
      fileName: analysis.fileName,
      score: analysis.score,
      matched: analysis.matched,
      missing: analysis.missing,
      date: new Date(analysis.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
  } catch (err) {
    console.error("GetAnalysis error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};