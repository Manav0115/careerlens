import { useState } from 'react'
import { Link } from 'react-router-dom'
import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import SkillBar from '../components/dashboard/SkillBar'
import SkillTag from '../components/results/SkillTag'
import { useAnalysis } from '../context/AnalysisContext'
import { ROLE_SKILLS, CATEGORY_MAP, JOB_ROLES } from '../utils/roleSkills'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/inner.css'

const RESOURCES: Record<string, { title: string; url: string; type: string }[]> = {
  'DevOps Engineer':    [
    { title:'HashiCorp Terraform — official tutorials', url:'https://developer.hashicorp.com/terraform/tutorials', type:'Free' },
    { title:'Ansible for DevOps — Jeff Geerling',       url:'https://www.ansiblefordevops.com', type:'Paid' },
    { title:'Linux Command Line — full free course',    url:'https://linuxcommand.org', type:'Free' },
  ],
  'Frontend Developer': [
    { title:'React official docs — react.dev',          url:'https://react.dev', type:'Free' },
    { title:'TypeScript handbook — typescriptlang.org', url:'https://www.typescriptlang.org/docs', type:'Free' },
    { title:'CSS Tricks — complete guide to Flexbox',   url:'https://css-tricks.com/snippets/css/a-guide-to-flexbox', type:'Free' },
  ],
}
const DEFAULT_RESOURCES = [
  { title:'freeCodeCamp — full curriculum',   url:'https://www.freecodecamp.org', type:'Free' },
  { title:'The Odin Project — web dev path',  url:'https://www.theodinproject.com', type:'Free' },
  { title:'Roadmap.sh — role-based learning', url:'https://roadmap.sh', type:'Free' },
]

export default function Skills() {
  const { results, selectedRole, setSelectedRole } = useAnalysis()
  const role    = selectedRole ?? results?.role ?? 'DevOps Engineer'
  const skills  = ROLE_SKILLS[role] ?? []
  const matched = results?.matched ?? skills.slice(0, Math.ceil(skills.length * 0.6))
  const missing = skills.filter(s => !matched.includes(s))
  const score   = Math.round((matched.length / skills.length) * 100)
  const cats    = CATEGORY_MAP[role] ?? []
  const resources = RESOURCES[role] ?? DEFAULT_RESOURCES

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">

          <div className="in-page-header fade-up delay-1">
            <div>
              <h1 className="in-page-title">Skill gaps</h1>
              <p className="in-page-sub">Detailed breakdown of matched and missing skills</p>
            </div>
            <select
              className="form-input" style={{ width:200, fontSize:13 }}
              value={role}
              onChange={e => setSelectedRole(e.target.value)}
            >
              {JOB_ROLES.map(r => <option key={r.role} value={r.role}>{r.role}</option>)}
            </select>
          </div>

          {/* Overview bar */}
          <div className="db-panel fade-up delay-2">
            <div className="db-panel-head">
              <div className="db-panel-title">Overall skills coverage</div>
              <span style={{ fontSize:13, fontWeight:500, color: score >= 70 ? '#1D9E75' : score >= 50 ? '#7F77DD' : '#E24B4A' }}>
                {score}%
              </span>
            </div>
            <SkillBar label={`${matched.length} of ${skills.length} skills`} pct={score} color={score >= 70 ? '#1D9E75' : score >= 50 ? '#7F77DD' : '#E24B4A'} delay={0.1} />
          </div>

          {/* Matched + Missing */}
          <div className="in-two-col fade-up delay-2">
            <div className="db-panel">
              <div className="db-panel-head">
                <div className="db-panel-title" style={{ color:'#1D9E75' }}>✓ Matched skills ({matched.length})</div>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, paddingTop:4 }}>
                {matched.map((s,i) => <SkillTag key={s} skill={s} matched delay={i*0.05} />)}
              </div>
            </div>
            <div className="db-panel">
              <div className="db-panel-head">
                <div className="db-panel-title" style={{ color:'#E24B4A' }}>✗ Missing skills ({missing.length})</div>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, paddingTop:4 }}>
                {missing.map((s,i) => <SkillTag key={s} skill={s} matched={false} delay={i*0.05} />)}
              </div>
            </div>
          </div>

          {/* Category bars */}
          {cats.length > 0 && (
            <div className="db-panel fade-up delay-3">
              <div className="db-panel-head">
                <div className="db-panel-title">Skill category breakdown</div>
              </div>
              {cats.map((cat, i) => {
                const m   = cat.skills.filter(s => matched.includes(s)).length
                const pct = Math.round((m / cat.skills.length) * 100)
                const c   = pct >= 70 ? '#7F77DD' : pct >= 40 ? '#BA7517' : '#E24B4A'
                return <SkillBar key={cat.name} label={`${cat.name}  (${m}/${cat.skills.length})`} pct={pct} color={c} delay={i*0.15} />
              })}
            </div>
          )}

          {/* Learning resources */}
          <div className="db-panel fade-up delay-4">
            <div className="db-panel-head">
              <div className="db-panel-title">Learning resources for {role}</div>
            </div>
            {resources.map(r => (
              <div key={r.title} className="in-resource-item">
                <div className="in-resource-icon">📚</div>
                <div className="in-resource-info">
                  <div className="in-resource-title">{r.title}</div>
                  <div className="in-resource-url">{r.url}</div>
                </div>
                <span className={`db-badge ${r.type === 'Free' ? 'badge-done' : 'badge-improve'}`}>{r.type}</span>
              </div>
            ))}
          </div>

          <div className="rs-cta-row fade-up delay-5">
            <div className="rs-cta-text">Updated your skills? Re-analyse to track your progress.</div>
            <Link to="/analyse" className="btn-primary">Start new analysis →</Link>
          </div>

        </main>
      </div>
    </div>
  )
}