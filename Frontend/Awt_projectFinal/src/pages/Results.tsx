import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import StepBar from '../components/analyse/StepBar'
import SkillTag       from '../components/results/SkillTag'
import SuggestionItem from '../components/results/SuggestionItem'
import SkillBar from '../components/dashboard/SkillBar'
import { useAnalysis } from '../context/AnalysisContext'
import { getSuggestions, CATEGORY_MAP } from '../utils/roleSkills'
import { getScoreColor } from '../utils/helpers'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/results.css'

const CIRC = 2 * Math.PI * 56

export default function Results() {
  const { results } = useAnalysis()
  const navigate    = useNavigate()
  const [offset, setOffset] = useState(CIRC)

  useEffect(() => {
    if (!results) { navigate('/analyse'); return }
    setTimeout(() => setOffset(CIRC - (results.score / 100) * CIRC), 300)
  }, [results])

  if (!results) return null

  const cats = CATEGORY_MAP[results.role] ?? []
  const INSIGHTS = [
    { color:'#7F77DD', strong:'Strong foundation', text:' — Your existing skills cover the core technical requirements well.' },
    { color:'#E24B4A', strong:'Critical gap',       text:` — Missing ${results.missing.slice(0,2).join(' & ')} reduces match by ~${results.missing.length * 8}%.` },
    { color:'#BA7517', strong:'Resume format',      text:' — Add a dedicated Skills section to improve ATS compatibility.' },
    { color:'#1D9E75', strong:'Market fit',          text:' — Your profile is competitive for mid-level roles at product companies.' },
  ]
  const NEXT_STEPS = [
    { title:'Close your top skill gap',     desc:`Start with ${results.missing[0] ?? 'missing skills'} — appears in most listings for this role.` },
    { title:'Update your GitHub profile',   desc:'Pin 2–3 relevant projects and add README files with tech stack details.' },
    { title:'Re-run analysis after updates',desc:'Upload your updated resume to track score improvement over time.' },
  ]

  return (
    <div className="db-body rs-body">
      <Topbar />
      <StepBar currentStep={4} />
      <div className="db-layout">
        <Sidebar />
        <main className="rs-main db-main">

          {/* Hero score */}
          <div className="rs-hero fade-up delay-1">
            <div className="rs-score-block">
              <svg width="130" height="130" viewBox="0 0 130 130" className="rs-ring-svg">
                <circle cx="65" cy="65" r="56" fill="none" stroke="#1C1C2A" strokeWidth="10"/>
                <circle cx="65" cy="65" r="56" fill="none" stroke="#7F77DD" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={offset}
                  transform="rotate(-90 65 65)"
                  style={{ transition:'stroke-dashoffset 1.6s ease' }}
                />
              </svg>
              <div className="rs-score-center">
                <div className="rs-score-num">{results.score}%</div>
                <div className="rs-score-lbl">Match</div>
              </div>
            </div>
            <div className="rs-hero-info">
              <div className="rs-hero-role">{results.role}</div>
              <h1 className="rs-hero-title">Resume Analysis — {results.fileName}</h1>
              <p className="rs-hero-sub">Analysed on {results.date}</p>
              <div className="rs-score-chips">
                <div className="rs-chip rs-chip-green"><span>{results.matched.length}</span> skills matched</div>
                <div className="rs-chip rs-chip-red"><span>{results.missing.length}</span> skills missing</div>
                <div className="rs-chip rs-chip-purple">AI powered</div>
              </div>
            </div>
            <div className="rs-hero-actions">
              <Link to="/dashboard" className="btn-ghost rs-action-btn">← Dashboard</Link>
              <Link to="/analyse"   className="btn-primary rs-action-btn">Analyse again</Link>
            </div>
          </div>

          {/* Matched / Missing */}
          <div className="rs-two-col fade-up delay-2">
            <div className="rs-panel rs-panel-green">
              <div className="rs-panel-head">
                <div className="rs-panel-title rs-green-title">✓ Matched skills</div>
                <span className="rs-count-badge rs-badge-green">{results.matched.length}</span>
              </div>
              <div className="rs-tags-wrap">
                {results.matched.map((s,i) => <SkillTag key={s} skill={s} matched delay={i*0.05} />)}
              </div>
            </div>
            <div className="rs-panel rs-panel-red">
              <div className="rs-panel-head">
                <div className="rs-panel-title rs-red-title">✗ Missing skills</div>
                <span className="rs-count-badge rs-badge-red">{results.missing.length}</span>
              </div>
              <div className="rs-tags-wrap">
                {results.missing.map((s,i) => <SkillTag key={s} skill={s} matched={false} delay={i*0.05} />)}
              </div>
            </div>
          </div>

          {/* Category bars */}
          {cats.length > 0 && (
            <div className="rs-panel fade-up delay-3">
              <div className="rs-panel-head"><div className="rs-panel-title">Skill category breakdown</div></div>
              {cats.map((cat, i) => {
                const matched = cat.skills.filter(s => results.matched.includes(s)).length
                const pct     = Math.round((matched / cat.skills.length) * 100)
                const color   = pct >= 70 ? '#7F77DD' : pct >= 40 ? '#BA7517' : '#E24B4A'
                return <SkillBar key={cat.name} label={cat.name} pct={pct} color={color} delay={i * 0.15} />
              })}
            </div>
          )}

          {/* Suggestions */}
          <div className="rs-panel fade-up delay-3">
            <div className="rs-panel-head">
              <div className="rs-panel-title">AI improvement suggestions</div>
              <span className="rs-panel-sub">Personalised for your role</span>
            </div>
            {getSuggestions(results.role).map(s => <SuggestionItem key={s.title} {...s} />)}
          </div>

          {/* Insights + Next steps */}
          <div className="rs-two-col fade-up delay-4">
            <div className="rs-panel">
              <div className="rs-panel-head"><div className="rs-panel-title">AI insights</div></div>
              {INSIGHTS.map(ins => (
                <div key={ins.strong} className="rs-insight-item">
                  <div className="rs-ins-dot" style={{ background: ins.color }}></div>
                  <div className="rs-ins-text"><strong>{ins.strong}</strong>{ins.text}</div>
                </div>
              ))}
            </div>
            <div className="rs-panel">
              <div className="rs-panel-head"><div className="rs-panel-title">Recommended next steps</div></div>
              {NEXT_STEPS.map((step, i) => (
                <div key={step.title} className="rs-next-item">
                  <div className="rs-next-num">{i+1}</div>
                  <div>
                    <div className="rs-next-title">{step.title}</div>
                    <div className="rs-next-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rs-cta-row fade-up delay-5">
            <div className="rs-cta-text">Ready to improve? Upload an updated resume and track your progress.</div>
            <Link to="/analyse" className="btn-primary rs-cta-btn">Start new analysis →</Link>
          </div>

        </main>
      </div>
    </div>
  )
}