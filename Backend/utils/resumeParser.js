const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path");

/**
 * Extract plain text from a PDF (or return filename hint for .doc/.docx).
 * @param {string} filePath - Absolute path to the uploaded file
 * @returns {Promise<string>} Extracted text
 */
module.exports = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  }

  // For .doc / .docx, return empty string — pdf-parse cannot handle them.
  // In production you would use mammoth or libreoffice for conversion.
  // For now, return the raw buffer as string (may extract some text).
  const dataBuffer = fs.readFileSync(filePath);
  return dataBuffer.toString("utf8");
};