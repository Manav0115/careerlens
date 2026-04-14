// ── User ──────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
}

// ── Analysis result ───────────────────────────────────────────
export interface Analysis {
  role: string
  score: number
  matched: string[]
  missing: string[]
  date: string
  fileName?: string
}

// ── History item ──────────────────────────────────────────────
export interface HistoryItem {
  role: string
  score: number
  date: string
  matched: number
  missing: number
}

// ── Auth context ──────────────────────────────────────────────
export interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, confirm: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// ── Analysis context ──────────────────────────────────────────
export interface AnalysisContextType {
  selectedRole: string | null
  setSelectedRole: (role: string) => void
  selectedFile: File | null
  setSelectedFile: (file: File | null) => void
  results: Analysis | null
  setResults: (results: Analysis) => void
  history: HistoryItem[]
  addToHistory: (item: HistoryItem) => void
}

// ── Job role card ─────────────────────────────────────────────
export interface JobRole {
  role: string
  icon: string
  desc: string
  skills: string[]
  tags: string[]
}

// ── Notification ──────────────────────────────────────────────
export interface Notification {
  id: number
  type: 'analysis' | 'tips' | 'system'
  title: string
  desc: string
  time: string
  read: boolean
  iconClass: string
  icon: string
  link: string
}

// ── Settings ──────────────────────────────────────────────────
export interface UserSettings {
  notifAnalysis: boolean
  notifTips: boolean
  notifRoles: boolean
  notifMilestone: boolean
  privHistory: boolean
  privAnalytics: boolean
  privRetain: boolean
  prefRole: string
  prefFormat: string
}

// ── Stat card props ───────────────────────────────────────────
export interface StatCardProps {
  icon: string
  value: string | number
  label: string
  delta?: string
  deltaType?: 'up' | 'down'
  delay?: number
}

// ── Skill bar props ───────────────────────────────────────────
export interface SkillBarProps {
  label: string
  pct: number
  color: string
  delay?: number
}

// ── Skill tag props ───────────────────────────────────────────
export interface SkillTagProps {
  skill: string
  matched: boolean
  delay?: number
}

// ── Suggestion item ───────────────────────────────────────────
export interface SuggestionItem {
  icon: string
  iconClass: string
  title: string
  desc: string
  priority: 'high' | 'medium' | 'low'
}

// ── Career path ───────────────────────────────────────────────
export interface CareerPath {
  role: string
  icon: string
  baseScore: number
  next: string
  salaryRange: string
  growth: string
}

// ── Roadmap step ──────────────────────────────────────────────
export interface RoadmapStep {
  title: string
  desc: string
  time: string
}

// ── AI insight ────────────────────────────────────────────────
export interface AIInsight {
  color: string
  strong: string
  text: string
}