import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import SkillBar from '../components/dashboard/SkillBar'
import { useAnalysis } from '../context/AnalysisContext'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/inner.css'
import '../assets/css/settings.css'

const RECS = [
  { title:'Add a dedicated Skills section',     desc:'A clearly separated skills section increases ATS keyword extraction by up to 40%.', impact:'+8% score' },
  { title:'Learn the top missing skill',        desc:'The first missing skill appears in 85%+ of listings. It is the single highest-impact gap to close.', impact:'+12% score' },
  { title:'Quantify your impact',               desc:'Replace generic descriptions with measurable results. E.g. "reduced build time by 35%"', impact:'+5% score' },
  { title:'Add a portfolio or GitHub link',     desc:'Recruiters spend 6 seconds on a resume — a live project link dramatically increases engagement.', impact:'+7% score' },
]

export default function Insights() {
  const { results, selectedRole } = useAnalysis()
  const role    = results?.role ?? selectedRole ?? 'DevOps Engineer'
  const score   = results?.score ?? 72
  const matched = results?.matched ?? ['Docker','Kubernetes','Linux','Git','AWS','CI/CD']
  const missing = results?.missing ?? ['Terraform','Ansible','Jenkins','Monitoring']
  const total   = matched.length + missing.length

  const ats  = Math.round(score * 0.94)
  const kw   = Math.min(Math.round(score * 1.03), 98)
  const sk   = Math.round((matched.length / total) * 100)
  const exp  = Math.min(score + 8, 98)

  const desc = score >= 80
    ? 'Excellent match! Your resume is highly competitive for this role.'
    : score >= 60
    ? 'Your resume is moderately ready. Focus on closing skill gaps to reach 85%+.'
    : 'Your resume needs significant improvement. Start with high-priority gaps.'

  const STRENGTHS = [
    { title:'Technical foundation',   desc:'Your core technical skills are well-represented.' },
    { title:'Relevant experience',    desc:'Your background aligns with the general requirements.' },
    { title:'Matched keywords',       desc:'Key terms from job requirements appear in your resume.' },
  ]
  const WEAKNESSES = missing.slice(0, 3).map(s => ({
    title: `Missing: ${s}`,
    desc:  `${s} appears in most job listings for ${role} and is currently absent from your resume.`,
  }))
  const MARKET = [
    { label:'Average salary (India)',  val:'₹12–18 LPA',   trend:'↑ growing',  cls:'trend-up' },
    { label:'Job listings (monthly)', val:'4,200+',         trend:'↑',          cls:'trend-up' },
    { label:'Top demanded skill',     val: matched[0] ?? 'Docker', trend:'→', cls:'trend-flat' },
    { label:'Remote opportunities',   val:'68%',           trend:'↑ rising',   cls:'trend-up' },
    { label:'Interview difficulty',   val:'Medium–High',   trend:'→',          cls:'trend-flat' },
  ]

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">

          <div className="in-page-header fade-up delay-1">
            <div>
              <h1 className="in-page-title">AI insights</h1>
              <p className="in-page-sub">Deep analysis of your resume powered by artificial intelligence</p>
            </div>
            <div className="ai-role-tag">{role}</div>
          </div>

          {/* Hero score card */}
          <div className="ai-hero-card fade-up delay-2">
            <div className="ai-hero-left">
              <div className="ai-hero-label">AI READINESS SCORE</div>
              <div className="ai-hero-score">{score}%</div>
              <div className="ai-hero-desc">{desc}</div>
            </div>
            <div className="ai-hero-right">
              {[
                { label:'ATS compatibility',    val:ats, color:'#7F77DD' },
                { label:'Keyword density',       val:kw,  color:'#7F77DD' },
                { label:'Skills coverage',       val:sk,  color:'#BA7517' },
                { label:'Experience relevance',  val:exp, color:'#1D9E75' },
              ].map(m => (
                <SkillBar key={m.label} label={m.label} pct={m.val} color={m.color} delay={0.1} />
              ))}
            </div>
          </div>

          {/* Insight metric cards */}
          <div className="ai-insights-grid fade-up delay-3">
            {[
              { icon:'◈', label:'Match score',    value:`${score}%`,        desc:'vs role requirements',             cls:'ai-card-purple' },
              { icon:'✓', label:'Skills matched', value:matched.length,     desc:`out of ${total} required`,        cls:'ai-card-green'  },
              { icon:'✗', label:'Skills missing', value:missing.length,     desc:'gaps to close',                   cls:'ai-card-red'    },
              { icon:'◉', label:'ATS readability',value:`${ats}%`,          desc:'system compatibility',            cls:'ai-card-amber'  },
            ].map(c => (
              <div key={c.label} className={`ai-insight-card ${c.cls}`}>
                <div className="ai-card-icon">{c.icon}</div>
                <div className="ai-card-label">{c.label}</div>
                <div className="ai-card-value">{c.value}</div>
                <div className="ai-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Strengths + Weaknesses */}
          <div className="in-two-col fade-up delay-3">
            <div className="db-panel">
              <div className="db-panel-head">
                <div className="db-panel-title" style={{ color:'#1D9E75' }}>✓ Your strengths</div>
              </div>
              {STRENGTHS.map(s => (
                <div key={s.title} className="ai-sw-item">
                  <div className="ai-sw-dot" style={{ background:'#1D9E75' }}></div>
                  <div><div className="ai-sw-title">{s.title}</div><div className="ai-sw-desc">{s.desc}</div></div>
                </div>
              ))}
            </div>
            <div className="db-panel">
              <div className="db-panel-head">
                <div className="db-panel-title" style={{ color:'#E24B4A' }}>✗ Areas to improve</div>
              </div>
              {WEAKNESSES.map(w => (
                <div key={w.title} className="ai-sw-item">
                  <div className="ai-sw-dot" style={{ background:'#E24B4A' }}></div>
                  <div><div className="ai-sw-title">{w.title}</div><div className="ai-sw-desc">{w.desc}</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="db-panel fade-up delay-4">
            <div className="db-panel-head">
              <div className="db-panel-title">AI recommendations</div>
              <span style={{ fontSize:11, color:'#6B6A80' }}>Personalised action plan</span>
            </div>
            {RECS.map((r, i) => (
              <div key={r.title} className="ai-rec-item">
                <div className="ai-rec-num">{i + 1}</div>
                <div>
                  <div className="ai-rec-title">{r.title}</div>
                  <div className="ai-rec-desc">{r.desc}</div>
                  <span className="ai-rec-impact">{r.impact}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Market intelligence */}
          <div className="db-panel fade-up delay-5">
            <div className="db-panel-head">
              <div className="db-panel-title">Market intelligence</div>
              <span style={{ fontSize:11, color:'#6B6A80' }}>Industry trends for your role</span>
            </div>
            {MARKET.map(m => (
              <div key={m.label} className="ai-market-item">
                <span className="ai-market-label">{m.label}</span>
                <div style={{ textAlign:'right' }}>
                  <div className="ai-market-val">{m.val}</div>
                  <div className={`ai-market-trend ${m.cls}`}>{m.trend}</div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}
