import { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import { useAnalysis } from '../context/AnalysisContext'
import { getScoreColor } from '../utils/helpers'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/inner.css'

const DEMO = [
  { role:'DevOps Engineer',   date:'Mar 14, 2026', score:72, matched:6, missing:4 },
  { role:'Cloud Architect',   date:'Mar 12, 2026', score:65, matched:6, missing:4 },
  { role:'Backend Developer', date:'Mar 10, 2026', score:78, matched:7, missing:3 },
  { role:'ML Engineer',       date:'Mar 8, 2026',  score:48, matched:4, missing:6 },
]

type Filter = 'all' | 'high' | 'mid' | 'low'

export default function History() {
  const { history: ctxHistory } = useAnalysis()
  const all = ctxHistory.length ? ctxHistory : DEMO
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState<Filter>('all')

  const filtered = all.filter(h => {
    const matchSearch = h.role.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' ? true
      : filter === 'high' ? h.score >= 70
      : filter === 'mid'  ? h.score >= 50 && h.score < 70
      : h.score < 50
    return matchSearch && matchFilter
  })

  const best = all.length ? Math.max(...all.map(h => h.score)) : 0
  const avg  = all.length ? Math.round(all.reduce((s,h) => s + h.score, 0) / all.length) : 0

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">

          <div className="in-page-header fade-up delay-1">
            <div>
              <h1 className="in-page-title">Analysis history</h1>
              <p className="in-page-sub">All your past resume analyses in one place</p>
            </div>
            <Link to="/analyse" className="btn-primary">+ New analysis</Link>
          </div>

          {/* Stats */}
          <div className="in-stats-row fade-up delay-2">
            {[
              { num: all.length,      lbl:'Total analyses' },
              { num: best + '%',      lbl:'Best score' },
              { num: avg  + '%',      lbl:'Average score' },
              { num: (all[0]?.score ?? 0) + '%', lbl:'Latest score' },
            ].map(s => (
              <div key={s.lbl} className="in-stat-chip">
                <div className="in-stat-chip-num">{s.num}</div>
                <div className="in-stat-chip-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="in-filter-bar fade-up delay-2">
            <div className="an-search-box" style={{ maxWidth:280, margin:0 }}>
              <span style={{ fontSize:13 }}>🔍</span>
              <input className="an-search-input" placeholder="Search by role..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="in-filter-pills">
              {(['all','high','mid','low'] as Filter[]).map(f => (
                <button key={f} className={`in-filter-pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All' : f === 'high' ? 'High (70%+)' : f === 'mid' ? 'Mid (50–69%)' : 'Low (<50%)'}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="db-panel fade-up delay-3">
            <div className="hist-table-head">
              <span>Role</span><span>Date</span><span>Score</span><span>Matched</span><span>Missing</span><span>Status</span><span></span>
            </div>
            {filtered.length === 0 && (
              <div className="in-empty-state">
                <div className="in-empty-icon">≡</div>
                <div className="in-empty-title">No analyses found</div>
                <div className="in-empty-sub">Try changing your search or filter</div>
              </div>
            )}
            {filtered.map((h, i) => (
              <div key={i} className="hist-table-row">
                <span className="hist-col-role">{h.role}</span>
                <span className="hist-col-date">{h.date}</span>
                <span className="hist-col-score" style={{ color: getScoreColor(h.score) }}>{h.score}%</span>
                <span className="hist-col-num" style={{ color:'#1D9E75' }}>{h.matched} ✓</span>
                <span className="hist-col-num" style={{ color:'#E24B4A' }}>{h.missing} ✗</span>
                <span><span className={`db-badge ${h.score >= 70 ? 'badge-done' : 'badge-improve'}`}>{h.score >= 70 ? 'Good' : 'Improve'}</span></span>
                <span><Link to="/results" className="hist-view-btn">View →</Link></span>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}