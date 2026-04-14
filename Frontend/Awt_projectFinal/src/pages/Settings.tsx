import { useState } from 'react'
import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import { useAnalysis } from '../context/AnalysisContext'
import { JOB_ROLES } from '../utils/roleSkills'
import type { UserSettings } from '../types'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/inner.css'
import '../assets/css/settings.css'

const DEFAULTS: UserSettings = {
  notifAnalysis: true, notifTips: true, notifRoles: false, notifMilestone: true,
  privHistory: true, privAnalytics: true, privRetain: false,
  prefRole: '', prefFormat: 'percent',
}

function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem('cl_settings')
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
  } catch { return DEFAULTS }
}

export default function Settings() {
  const { selectedRole } = useAnalysis()
  const [s, setS] = useState<UserSettings>({ ...loadSettings(), prefRole: selectedRole ?? '' })
  const [banner, setBanner] = useState<string>('')

  function toggle(key: keyof UserSettings) {
    setS(prev => ({ ...prev, [key]: !prev[key] }))
  }
  function save() {
    localStorage.setItem('cl_settings', JSON.stringify(s))
    if (s.prefRole) localStorage.setItem('cl_role', s.prefRole)
    setBanner('Settings saved successfully!')
    setTimeout(() => setBanner(''), 3000)
  }
  function exportData() {
    const blob = new Blob([JSON.stringify({ settings: s, history: JSON.parse(localStorage.getItem('cl_history')||'[]') }, null, 2)], { type:'application/json' })
    const a    = document.createElement('a')
    a.href     = URL.createObjectURL(blob)
    a.download = 'careerlens-data.json'
    a.click()
  }
  function clearHistory() {
    if (confirm('Clear all analysis history? This cannot be undone.')) {
      localStorage.removeItem('cl_history')
      localStorage.removeItem('cl_results')
      setBanner('History cleared.')
      setTimeout(() => setBanner(''), 3000)
    }
  }

  const Toggle = ({ k }: { k: keyof UserSettings }) => (
    <label className="st-toggle">
      <input type="checkbox" checked={!!s[k]} onChange={() => toggle(k)} />
      <span className="st-toggle-track"></span>
    </label>
  )

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">

          <div className="in-page-header fade-up delay-1">
            <div>
              <h1 className="in-page-title">Settings</h1>
              <p className="in-page-sub">Manage your CareerLens preferences</p>
            </div>
            <button className="btn-primary" onClick={save}>Save changes</button>
          </div>

          {banner && <div className="auth-banner success" style={{ maxWidth:'100%', marginBottom:14 }}>{banner}</div>}

          {/* Notifications */}
          <div className="db-panel fade-up delay-2">
            <div className="db-panel-head"><div className="db-panel-title">Notifications</div></div>
            <div className="st-toggle-list">
              {([
                ['notifAnalysis','Analysis complete alerts',   'Get notified when your resume analysis finishes'],
                ['notifTips',    'Weekly career tips',          'Receive weekly insights to improve your score'],
                ['notifRoles',   'New role recommendations',   'Be alerted when new job roles are added'],
                ['notifMilestone','Score milestone alerts',    'Celebrate when your score crosses 70%, 80%, 90%'],
              ] as [keyof UserSettings, string, string][]).map(([k, title, desc]) => (
                <div key={k} className="st-toggle-row">
                  <div className="st-toggle-info">
                    <div className="st-toggle-title">{title}</div>
                    <div className="st-toggle-desc">{desc}</div>
                  </div>
                  <Toggle k={k} />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="db-panel fade-up delay-3">
            <div className="db-panel-head"><div className="db-panel-title">Privacy</div></div>
            <div className="st-toggle-list">
              {([
                ['privHistory',  'Save analysis history',      'Store past analyses to track progress over time'],
                ['privAnalytics','Anonymous usage analytics',  'Help improve CareerLens by sharing anonymised data'],
                ['privRetain',   'Resume data retention',      'Keep uploaded resume text for faster re-analysis'],
              ] as [keyof UserSettings, string, string][]).map(([k, title, desc]) => (
                <div key={k} className="st-toggle-row">
                  <div className="st-toggle-info">
                    <div className="st-toggle-title">{title}</div>
                    <div className="st-toggle-desc">{desc}</div>
                  </div>
                  <Toggle k={k} />
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="db-panel fade-up delay-3">
            <div className="db-panel-head"><div className="db-panel-title">Preferences</div></div>
            <div className="st-select-list">
              <div className="st-select-row">
                <div className="st-toggle-info">
                  <div className="st-toggle-title">Default job role</div>
                  <div className="st-toggle-desc">Pre-select this role when starting a new analysis</div>
                </div>
                <select className="form-input st-select" style={{ width:200 }}
                  value={s.prefRole} onChange={e => setS(p => ({ ...p, prefRole: e.target.value }))}>
                  <option value="">No default</option>
                  {JOB_ROLES.map(r => <option key={r.role} value={r.role}>{r.role}</option>)}
                </select>
              </div>
              <div className="st-select-row">
                <div className="st-toggle-info">
                  <div className="st-toggle-title">Score display format</div>
                  <div className="st-toggle-desc">How you prefer to see your match score</div>
                </div>
                <select className="form-input st-select" style={{ width:200 }}
                  value={s.prefFormat} onChange={e => setS(p => ({ ...p, prefFormat: e.target.value }))}>
                  <option value="percent">Percentage (72%)</option>
                  <option value="fraction">Fraction (6/10)</option>
                  <option value="grade">Grade (B+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data management */}
          <div className="db-panel fade-up delay-4">
            <div className="db-panel-head"><div className="db-panel-title">Data management</div></div>
            <div className="st-data-actions">
              <div className="st-data-item">
                <div>
                  <div className="st-toggle-title">Export your data</div>
                  <div className="st-toggle-desc">Download all your analyses as a JSON file</div>
                </div>
                <button className="in-edit-btn" onClick={exportData}>Export JSON</button>
              </div>
              <div className="st-data-item">
                <div>
                  <div className="st-toggle-title">Clear analysis history</div>
                  <div className="st-toggle-desc">Permanently delete all past analyses from this device</div>
                </div>
                <button className="in-danger-btn" style={{ width:'auto', padding:'6px 16px', fontSize:12 }} onClick={clearHistory}>
                  Clear history
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}