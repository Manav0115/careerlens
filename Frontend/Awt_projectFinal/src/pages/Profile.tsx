import { useState } from 'react'
import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import { useAuth }     from '../context/AuthContext'
import { useAnalysis } from '../context/AnalysisContext'
import { getInitials } from '../utils/helpers'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/inner.css'

export default function Profile() {
  const { user, logout } = useAuth()
  const { history }      = useAnalysis()
  const [editMode, setEditMode] = useState(false)
  const [name,  setName]  = useState(user?.name  ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [banner, setBanner] = useState<{msg:string;type:'success'|'error'}|null>(null)

  const best    = history.length ? Math.max(...history.map(h => h.score)) : 72
  const first   = history.length ? history[history.length-1].score : 48
  const growth  = best - first

  function save(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email) { setBanner({ msg:'Name and email are required.', type:'error' }); return }
    setBanner({ msg:'Profile updated successfully!', type:'success' })
    setTimeout(() => { setBanner(null); setEditMode(false) }, 1500)
  }

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">

          <div className="in-page-header fade-up delay-1">
            <div>
              <h1 className="in-page-title">Your profile</h1>
              <p className="in-page-sub">Manage your account details and preferences</p>
            </div>
          </div>

          <div className="in-two-col">
            {/* Profile card */}
            <div className="db-panel fade-up delay-2">
              <div className="db-panel-head">
                <div className="db-panel-title">Account information</div>
                {!editMode && <button className="in-edit-btn" onClick={() => setEditMode(true)}>Edit</button>}
              </div>

              <div className="pf-avatar-row">
                <div className="pf-avatar-big">{user ? getInitials(user.name) : 'CL'}</div>
                <div>
                  <div className="pf-avatar-name">{user?.name}</div>
                  <div className="pf-avatar-email">{user?.email}</div>
                  <div className="pf-member-badge">Member since March 2026</div>
                </div>
              </div>

              {!editMode ? (
                <>
                  {[['Full name', user?.name],['Email address',user?.email],['Account ID',user?.id]].map(([l,v]) => (
                    <div key={String(l)} className="pf-field-row">
                      <div className="pf-field-label">{l}</div>
                      <div className="pf-field-val" style={l==='Account ID'?{fontFamily:'monospace',fontSize:11,color:'#3A3A50'}:{}}>{v}</div>
                    </div>
                  ))}
                </>
              ) : (
                <form onSubmit={save}>
                  {banner && <div className={`auth-banner ${banner.type}`}>{banner.msg}</div>}
                  <div className="form-group">
                    <label className="form-label">Full name</label>
                    <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New password <span style={{fontSize:11,color:'#3A3A50'}}>(leave blank to keep current)</span></label>
                    <input type="password" className="form-input" placeholder="New password" />
                  </div>
                  <div className="pf-edit-actions">
                    <button type="submit" className="btn-primary-lg" style={{marginTop:0}}>Save changes</button>
                    <button type="button" className="btn-secondary-lg" style={{marginTop:0}} onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </form>
              )}
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {/* Stats */}
              <div className="db-panel fade-up delay-3">
                <div className="db-panel-head"><div className="db-panel-title">Your statistics</div></div>
                <div className="pf-stats-grid">
                  {[
                    { num: history.length || 4, lbl:'Analyses done' },
                    { num: best + '%',           lbl:'Best score' },
                    { num: new Set(history.map(h=>h.role)).size || 4, lbl:'Roles tested' },
                    { num: (growth>=0?'+':'')+growth+'%', lbl:'Score growth' },
                  ].map(s => (
                    <div key={s.lbl} className="pf-stat">
                      <div className="pf-stat-num">{s.num}</div>
                      <div className="pf-stat-lbl">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div className="db-panel fade-up delay-4">
                <div className="db-panel-head"><div className="db-panel-title">Danger zone</div></div>
                <p style={{ fontSize:12, color:'#6B6A80', marginBottom:14, lineHeight:1.6 }}>
                  Deleting your account will permanently remove all your analyses, history and profile data.
                </p>
                <button className="in-danger-btn" onClick={() => { if(confirm('Delete account? This cannot be undone.')) logout() }}>
                  Delete account
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}