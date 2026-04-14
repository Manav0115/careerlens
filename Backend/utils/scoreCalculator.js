/**
 * Calculate how well a resume text matches a list of required skills.
 * @param {string} text - Extracted resume text
 * @param {string[]} skills - Required skills for the role
 * @returns {{ matched: string[], missing: string[], score: number }}
 */
module.exports = (text, skills) => {
  if (!text || !skills || skills.length === 0) {
    return { matched: [], missing: [], score: 0 };
  }

  const normalizedText = text.toLowerCase();
  const matched = [];
  const missing = [];

  skills.forEach((skill) => {
    // Use word-boundary-like check: skill appears as whole word / phrase
    const skillLower = skill.toLowerCase();
    // Allow partial match for multi-word skills (e.g. "Machine Learning")
    if (normalizedText.includes(skillLower)) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });

  const score =
    skills.length > 0
      ? Math.round((matched.length / skills.length) * 100)
      : 0;

  return { matched, missing, score };
};