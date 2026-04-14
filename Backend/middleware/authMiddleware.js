const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Support both "Bearer <token>" and raw token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided, access denied" });
  }

  // Strip "Bearer " prefix if present
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  if (!token) {
    return res.status(401).json({ msg: "No token provided, access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired, please login again" });
    }
    return res.status(401).json({ msg: "Invalid token" });
  }
};