// ── Get user initials from full name ──────────────────────────
export function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return 'CL'
}

// ── Format bytes to human readable ───────────────────────────
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

// ── Format date to readable string ───────────────────────────
export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ── Get score colour based on value ──────────────────────────
export function getScoreColor(score: number): string {
  if (score >= 70) return '#1D9E75'
  if (score >= 50) return '#7F77DD'
  return '#E24B4A'
}

// ── Get password strength 0-3 ─────────────────────────────────
export function getPasswordStrength(password: string): number {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  // Clamp to 0-3 index
  return Math.min(Math.max(score - 1, 0), 3)
}

// ── Build simulated analysis result (fallback/demo only) ──────
import { ROLE_SKILLS } from './roleSkills'
import type { Analysis } from '../types'

export function buildResults(role: string, fileName: string): Analysis {
  const skills = ROLE_SKILLS[role] ?? ROLE_SKILLS['DevOps Engineer']
  const matchCount = Math.ceil(skills.length * 0.6)
  const matched = skills.slice(0, matchCount)
  const missing = skills.slice(matchCount)
  const score = Math.round((matched.length / skills.length) * 100)
  return {
    role,
    score,
    matched,
    missing,
    date: formatDate(),
    fileName,
  }
}