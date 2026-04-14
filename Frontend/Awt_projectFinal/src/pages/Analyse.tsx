import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import StepBar  from '../components/analyse/StepBar'
import RoleCard from '../components/analyse/RoleCard'
import { useAnalysis } from '../context/AnalysisContext'
import { JOB_ROLES }   from '../utils/roleSkills'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/analyse.css'

export default function Analyse() {
  const { selectedRole, setSelectedRole } = useAnalysis()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = JOB_ROLES.filter(r =>
    r.role.toLowerCase().includes(search.toLowerCase()) ||
    r.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="db-body an-body">
      <Topbar />
      <StepBar currentStep={1} />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main an-main" style={{ maxWidth: 860, margin: '0 auto' }}>

          <div className="an-header fade-up delay-1">
            <div className="sec-eyebrow">Step 1 of 4</div>
            <h1 className="an-title">Choose your target role</h1>
            <p className="an-sub">Pick the job role you are applying for. We will match your resume against its exact skill requirements.</p>
          </div>

          <div className="an-search-wrap fade-up delay-2">
            <div className="an-search-box">
              <span className="an-search-icon">🔍</span>
              <input
                type="text" className="an-search-input"
                placeholder="Search roles..."
                value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="an-roles-grid fade-up delay-3">
            {filtered.map(role => (
              <RoleCard
                key={role.role}
                role={role}
                selected={selectedRole === role.role}
                onSelect={setSelectedRole}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="an-no-results">
              <div className="an-no-results-icon">🔍</div>
              <div className="an-no-results-text">No roles found for "{search}"</div>
              <div className="an-no-results-sub">Try "cloud", "data" or "mobile"</div>
            </div>
          )}

          <div className="an-cta-row fade-up delay-4">
            <div className="an-selected-info">
              <span className="an-selected-label">Selected:</span>
              <span className="an-selected-name">{selectedRole ?? 'None'}</span>
            </div>
            <button
              className="btn-primary-lg an-continue-btn"
              disabled={!selectedRole}
              onClick={() => navigate('/upload')}
              style={{ width:'auto', minWidth:200, marginTop:0 }}
            >
              Continue to upload →
            </button>
          </div>

        </main>
      </div>
    </div>
  )
}