import { Link } from 'react-router-dom'
import Topbar from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import { useAnalysis } from '../context/AnalysisContext'
import { getRoadmap, JOB_ROLES, ROLE_SKILLS } from '../utils/roleSkills'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/inner.css'
import '../assets/css/careers.css'

const SALARY: Record<string, string> = {
  'DevOps Engineer': '₹12–18 LPA',
  'Frontend Developer': '₹8–14 LPA',
  'Backend Developer': '₹10–16 LPA',
  'Data Scientist': '₹10–18 LPA',
  'ML Engineer': '₹14–22 LPA',
  'Cloud Architect': '₹18–28 LPA',
  'Full Stack Developer': '₹10–18 LPA',
  'Android Developer': '₹8–14 LPA',
  'Cybersecurity Engineer': '₹12–20 LPA',
  'UI/UX Designer': '₹6–12 LPA',
}

const GROWTH: Record<string, string> = {
  'DevOps Engineer': '↑ High demand',
  'ML Engineer': '↑↑ Fastest growing',
  'Cloud Architect': '↑ Very high',
  'Data Scientist': '↑ High',
  'Cybersecurity Engineer': '↑↑ Critical',
  'Frontend Developer': '→ Stable',
  'Backend Developer': '→ Stable',
  'Full Stack Developer': '↑ Growing',
  'Android Developer': '→ Stable',
  'UI/UX Designer': '↑ Growing',
}

export default function Careers() {
  const { results, selectedRole } = useAnalysis()
  const currentRole = results?.role ?? selectedRole ?? 'DevOps Engineer'

  const scored = JOB_ROLES.map((r) => {
    const skills = ROLE_SKILLS[r.role] ?? []
    const matchedCount = results
      ? results.matched.filter((s) => skills.includes(s)).length
      : Math.ceil(skills.length * 0.6)
    return {
      ...r,
      score: skills.length > 0 ? Math.round((matchedCount / skills.length) * 100) : 0,
    }
  }).sort((a, b) => b.score - a.score)

  const best = scored[0]
  const roadmap = getRoadmap(currentRole)

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">
          <div className="in-page-header fade-up delay-1">
            <div>
              <h1 className="in-page-title">Career paths</h1>
              <p className="in-page-sub">
                See which roles you are most ready for right now
              </p>
            </div>
            <Link to="/analyse" className="btn-primary">
              + New analysis
            </Link>
          </div>

          {/* Best match highlight */}
          <div
            className="db-panel fade-up delay-2"
            style={{
              background: 'rgba(127,119,221,0.07)',
              border: '1px solid rgba(127,119,221,0.25)',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: '#7F77DD',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              🎯 Your best match right now
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 22,
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: 4,
              }}
            >
              {best.role}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 18,
                fontWeight: 700,
                color: '#AFA9EC',
                marginBottom: 8,
              }}
            >
              {best.score}% compatibility
            </div>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                marginBottom: 12,
              }}
            >
              {best.desc}
            </p>
            <div
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}
            >
              <span
                style={{
                  fontSize: 12,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: 'rgba(29,158,117,0.1)',
                  color: '#1D9E75',
                  border: '1px solid rgba(29,158,117,0.2)',
                }}
              >
                {SALARY[best.role] ?? '₹10–16 LPA'}
              </span>
              <span
                style={{
                  fontSize: 12,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: 'rgba(127,119,221,0.1)',
                  color: '#AFA9EC',
                  border: '1px solid rgba(127,119,221,0.2)',
                }}
              >
                {GROWTH[best.role] ?? '↑ Growing'}
              </span>
            </div>
            <Link
              to="/analyse"
              className="btn-primary"
              style={{ display: 'inline-block' }}
            >
              Analyse for this role →
            </Link>
          </div>

          {/* All roles ranked */}
          <div className="db-panel fade-up delay-3">
            <div className="db-panel-head">
              <div className="db-panel-title">
                All roles — ranked by your readiness
              </div>
              <span style={{ fontSize: 11, color: '#6B6A80' }}>
                Based on your latest analysis
              </span>
            </div>
            {scored.map((r, i) => (
              <div
                key={r.role}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 32px 1fr 180px 52px',
                  alignItems: 'center',
                  gap: 12,
                  padding: '9px 0',
                  borderBottom: i < scored.length - 1 ? '1px solid #141420' : 'none',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--text-faint)',
                    fontWeight: 600,
                  }}
                >
                  #{i + 1}
                </span>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {r.role}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {SALARY[r.role] ?? '₹10–16 LPA'} ·{' '}
                    {GROWTH[r.role] ?? '↑ Growing'}
                  </div>
                </div>
                <div
                  style={{
                    height: 4,
                    background: 'var(--bg-border)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${r.score}%`,
                      height: '100%',
                      borderRadius: 2,
                      background:
                        r.score >= 70
                          ? '#1D9E75'
                          : r.score >= 50
                          ? '#7F77DD'
                          : '#E24B4A',
                      transition: 'width 1.2s ease',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 13,
                    color:
                      r.score >= 70
                        ? '#1D9E75'
                        : r.score >= 50
                        ? '#7F77DD'
                        : '#E24B4A',
                    textAlign: 'right',
                  }}
                >
                  {r.score}%
                </span>
              </div>
            ))}
          </div>

          {/* Roadmap */}
          <div className="db-panel fade-up delay-4">
            <div className="db-panel-head">
              <div className="db-panel-title">Your improvement roadmap</div>
              <span style={{ fontSize: 11, color: '#6B6A80' }}>
                For {currentRole}
              </span>
            </div>
            {roadmap.map((step, i) => (
              <div
                key={step.title}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '12px 0',
                  borderBottom:
                    i < roadmap.length - 1 ? '1px solid #141420' : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: 'rgba(127,119,221,0.12)',
                      border: '1px solid rgba(127,119,221,0.2)',
                      color: '#AFA9EC',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < roadmap.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        flex: 1,
                        background: 'var(--bg-border)',
                        marginTop: 4,
                        minHeight: 20,
                      }}
                    />
                  )}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: 3,
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      lineHeight: 1.55,
                    }}
                  >
                    {step.desc}
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 10,
                      padding: '2px 8px',
                      borderRadius: 20,
                      background: 'rgba(127,119,221,0.1)',
                      color: '#AFA9EC',
                      border: '1px solid rgba(127,119,221,0.2)',
                      marginTop: 5,
                    }}
                  >
                    ⏱ {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}