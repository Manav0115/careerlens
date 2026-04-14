import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Topbar   from '../components/shared/Topbar'
import Sidebar  from '../components/shared/Sidebar'
import StatCard from '../components/dashboard/StatCard'
import SkillBar from '../components/dashboard/SkillBar'
import ScoreRing from '../components/dashboard/ScoreRing'
import ScoreChart from '../components/dashboard/ScoreChart'
import SuggestionItem from '../components/results/SuggestionItem'
import { useAuth }     from '../context/AuthContext'
import { useAnalysis } from '../context/AnalysisContext'
import { formatDate, getScoreColor } from '../utils/helpers'
import { getSuggestions } from '../utils/roleSkills'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'

const DEMO_HISTORY = [
  { role:'DevOps Engineer',   date:'Mar 14, 2026', score:72, matched:6, missing:4 },
  { role:'Cloud Architect',   date:'Mar 12, 2026', score:65, matched:6, missing:4 },
  { role:'Backend Developer', date:'Mar 10, 2026', score:78, matched:7, missing:3 },
  { role:'ML Engineer',       date:'Mar 8, 2026',  score:48, matched:4, missing:6 },
]
const SKILL_BARS = [
  { label:'Infrastructure & Cloud', pct:80, color:'#7F77DD' },
  { label:'Containerisation',       pct:90, color:'#7F77DD' },
  { label:'CI/CD Pipelines',        pct:40, color:'#E24B4A' },
  { label:'Automation tools',       pct:30, color:'#E24B4A' },
  { label:'Monitoring',             pct:60, color:'#BA7517' },
]
const PATHS = [
  { role:'DevOps Engineer',  score:72, next:'Add Terraform + Ansible',  color:'#7F77DD' },
  { role:'Cloud Engineer',   score:68, next:'Add AWS cert',             color:'#1D9E75' },
  { role:'SRE Engineer',     score:55, next:'+Monitoring skills',       color:'#BA7517' },
  { role:'Platform Engineer',score:38, next:'Long-term goal',           color:'#3A3A50' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { results, history: ctxHistory } = useAnalysis()
  const history = ctxHistory.length ? ctxHistory : DEMO_HISTORY
  const analysis = results ?? { role:'DevOps Engineer', score:72, matched:['Docker','Kubernetes','Linux','Git','AWS','CI/CD'], missing:['Terraform','Ansible','Jenkins','Monitoring'], date: formatDate(), fileName:'resume.pdf' }

  const chartLabels = [...history].reverse().map(h => h.date?.split(',')[0] ?? '')
  const chartScores = [...history].reverse().map(h => h.score)

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">

          {/* Welcome */}
          <div className="db-welcome fade-up delay-1">
            <div>
              <h1 className="db-welcome-title">
                Welcome back, <span>{user?.name.split(' ')[0]}</span> 👋
              </h1>
              <p className="db-welcome-sub">Here's your resume intelligence overview</p>
            </div>
            <div className="db-welcome-date">Last updated · {formatDate()}</div>
          </div>

          {/* Stat cards */}
          <div className="db-stat-grid">
            <StatCard icon="◈" value={`${analysis.score}%`} label="Best match score"    delta="+8% from last analysis" deltaType="up"  delay={0.1} />
            <StatCard icon="≡" value={history.length}        label="Total analyses"      delta="2 this week"           deltaType="up"  delay={0.15}/>
            <StatCard icon="◎" value={analysis.missing.length} label="Skills to add"    delta={analysis.missing.slice(0,2).join(', ')} deltaType="down" delay={0.2} />
            <StatCard icon="✦" value={analysis.matched.length} label="Skills matched"   delta={analysis.matched.slice(0,2).join(', ')+'...'} deltaType="up" delay={0.25} />
          </div>

          {/* Row 1 */}
          <div className="db-two-col">
            {/* Latest analysis */}
            <div className="db-panel fade-up delay-3">
              <div className="db-panel-head">
                <div className="db-panel-title">Latest analysis</div>
                <Link to="/results" className="db-panel-action">View full report →</Link>
              </div>
              <div className="db-score-wrap">
                <div style={{ position:'relative', flexShrink:0 }}>
                  <ScoreRing score={analysis.score} />
                </div>
                <div className="db-score-info">
                  <div className="db-score-role">{analysis.role}</div>
                  <div className="db-score-name">Resume · {analysis.date}</div>
                  <div className="db-score-tags">
                    {analysis.matched.slice(0,4).map((s,i) => (
                      <span key={s} className="skill-tag tag-match" style={{ animationDelay:`${i*0.1}s` }}>{s} ✓</span>
                    ))}
                    {analysis.missing.slice(0,3).map((s,i) => (
                      <span key={s} className="skill-tag tag-miss" style={{ animationDelay:`${(i+4)*0.1}s` }}>{s} ✗</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Skill breakdown */}
            <div className="db-panel fade-up delay-4">
              <div className="db-panel-head">
                <div className="db-panel-title">Skill breakdown</div>
                <Link to="/skills" className="db-panel-action">Details →</Link>
              </div>
              {SKILL_BARS.map((b, i) => (
                <SkillBar key={b.label} label={b.label} pct={b.pct} color={b.color} delay={0.2 + i * 0.1} />
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="db-two-col">
            {/* Suggestions */}
            <div className="db-panel fade-up delay-4">
              <div className="db-panel-head">
                <div className="db-panel-title">AI improvement suggestions</div>
                <Link to="/insights" className="db-panel-action">Full plan →</Link>
              </div>
              {getSuggestions(analysis.role).map(s => (
                <SuggestionItem key={s.title} {...s} />
              ))}
            </div>

            {/* Score chart */}
            <div className="db-panel fade-up delay-5">
              <div className="db-panel-head">
                <div className="db-panel-title">Score progression</div>
                <Link to="/history" className="db-panel-action">All history →</Link>
              </div>
              <div className="db-chart-legend">
                <span className="db-legend-item"><span className="db-legend-dot" style={{ background:'#7F77DD' }}></span>Match score</span>
                <span className="db-legend-item"><span className="db-legend-dot" style={{ background:'#1D9E75' }}></span>Industry avg</span>
              </div>
              <ScoreChart labels={chartLabels} scores={chartScores} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="db-three-col">
            {/* AI Insights */}
            <div className="db-panel fade-up delay-5">
              <div className="db-panel-head">
                <div className="db-panel-title">AI insights</div>
                <Link to="/insights" className="db-panel-action">All →</Link>
              </div>
              {[
                { color:'#7F77DD', strong:'Strong foundation', text:' — Containerisation skills put you in the top 30% of applicants.' },
                { color:'#E24B4A', strong:'Critical gap',      text:` — Terraform absence reduces match by ~22%.` },
                { color:'#BA7517', strong:'Resume format',     text:' — Add a dedicated Skills section for better ATS parsing.' },
                { color:'#1D9E75', strong:'Market fit',        text:' — Strong for mid-level DevOps roles at product startups.' },
              ].map(ins => (
                <div key={ins.strong} className="db-insight-item">
                  <div className="db-ins-dot" style={{ background: ins.color }}></div>
                  <div className="db-ins-text"><strong>{ins.strong}</strong>{ins.text}</div>
                </div>
              ))}
            </div>

            {/* Career paths */}
            <div className="db-panel fade-up delay-6">
              <div className="db-panel-head">
                <div className="db-panel-title">Recommended paths</div>
                <Link to="/careers" className="db-panel-action">Explore →</Link>
              </div>
              {PATHS.map((p, i) => (
                <div key={p.role} className="db-path-item">
                  <div className="db-path-left">
                    <div className="db-path-dot" style={{ background: p.color }}></div>
                    {i < PATHS.length - 1 && <div className="db-path-line"></div>}
                  </div>
                  <div className="db-path-info">
                    <div className="db-path-role">{p.role}</div>
                    <div className="db-path-detail">{p.next}</div>
                  </div>
                  <div className="db-path-score" style={{ color: p.color }}>{p.score}%</div>
                </div>
              ))}
            </div>

            {/* History */}
            <div className="db-panel fade-up delay-7">
              <div className="db-panel-head">
                <div className="db-panel-title">Analysis history</div>
                <Link to="/history" className="db-panel-action">All →</Link>
              </div>
              <div className="db-hist-header">
                <span>Role</span><span>Date</span><span>Score</span><span>Status</span>
              </div>
              {history.slice(0,4).map(h => (
                <div key={h.role + h.date} className="db-hist-row">
                  <span className="db-hist-role">{h.role.split(' ')[0]}</span>
                  <span className="db-hist-date">{h.date.split(',')[0]}</span>
                  <span className="db-hist-score" style={{ color: getScoreColor(h.score) }}>{h.score}%</span>
                  <span className={`db-badge ${h.score >= 70 ? 'badge-done' : 'badge-improve'}`}>
                    {h.score >= 70 ? 'Done' : 'Improve'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}