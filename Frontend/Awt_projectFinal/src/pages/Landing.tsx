import { Link } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import '../assets/css/global.css'
import '../assets/css/landing.css'

export default function Landing() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="cl-badge-pulse fade-up delay-2">
          <div className="cl-badge-dot"></div>
          AI-powered resume intelligence
        </div>
        <h1 className="hero-h1 fade-up delay-3">Know exactly where</h1>
        <h1 className="hero-h2 fade-up delay-4">your resume <span>stands</span></h1>
        <p className="hero-sub fade-up delay-5">
          Upload your resume, pick a target role and instantly discover your match score,
          skill gaps and exactly what to do next.
        </p>
        <div className="hero-ctas fade-up delay-6">
          <Link to="/register" className="cta-main">Analyse my resume →</Link>
          <a href="#how-it-works" className="cta-sec">See how it works</a>
        </div>
        <p className="hero-trust fade-up delay-7">
          Trusted by <span>500+ students</span> across India
        </p>
      </section>

      {/* PREVIEW CARD */}
      <div className="preview-card fade-up delay-8">
        <div className="scan-line"></div>
        <div className="score-ring">
          <div className="score-inner">
            <div className="score-num">72%</div>
            <div className="score-lbl">MATCH</div>
          </div>
        </div>
        <div className="preview-mid">
          <div className="preview-role">DevOps Engineer</div>
          <div className="preview-name">Rahul Sharma — Resume Analysis</div>
          <div className="preview-tags">
            {['Docker ✓','Kubernetes ✓','Linux ✓','Git ✓'].map((s,i) => (
              <span key={s} className="skill-tag tag-match" style={{ animationDelay: `${i*0.1}s` }}>{s}</span>
            ))}
            {['Terraform ✗','Ansible ✗','Jenkins ✗'].map((s,i) => (
              <span key={s} className="skill-tag tag-miss" style={{ animationDelay: `${(i+4)*0.1}s` }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="preview-bars">
          {[['Technical','80%','#7F77DD',1.1],['Tools','65%','#7F77DD',1.25],['Experience','70%','#7F77DD',1.4]].map(([l,p,c,d]) => (
            <div key={String(l)} className="bar-row">
              <div className="bar-label"><span>{l}</span><span>{p}</span></div>
              <div className="bar-track">
                <div className="bar-fill" style={{ '--w': p, background: String(c), animationDelay: `${d}s` } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-row">
        {[['10+','Job roles supported'],['500+','Resumes analysed'],['3x','Faster interview prep'],['94%','User satisfaction']].map(([n,l]) => (
          <div key={String(l)} className="stat-item">
            <div className="stat-num">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="cl-divider"></div>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <div className="sec-eyebrow">How it works</div>
        <div className="sec-title">Three steps to <span>career clarity</span></div>
        <div className="steps-grid">
          {[
            { n:'01', icon:'🎯', t:'Pick your role',        d:'Choose from 10+ technical job roles — DevOps, Frontend, Data Scientist, ML Engineer and more.' },
            { n:'02', icon:'📄', t:'Upload your resume',    d:'Drop your PDF or Word doc. Our engine extracts every skill, tool and keyword automatically.' },
            { n:'03', icon:'✦',  t:'Get your results',      d:'Receive a match score, full skill breakdown and personalised improvement suggestions instantly.' },
          ].map(s => (
            <div key={s.n} className="step-card">
              <div className="step-bg-num">{s.n}</div>
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.t}</div>
              <p className="step-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="cl-divider"></div>

      {/* FEATURES */}
      <section className="section" id="features" style={{ paddingTop: 52 }}>
        <div className="sec-eyebrow">Features</div>
        <div className="sec-title">Everything you need to <span>get hired</span></div>
        <div className="features-grid">
          {[
            { icon:'🎯', t:'Skill match score',  d:'A precise compatibility percentage showing exactly how well your resume matches the job you want.' },
            { icon:'📊', t:'Gap analysis',        d:'Clear separation of matched vs missing skills so you always know what to work on next.' },
            { icon:'💡', t:'Smart suggestions',   d:'Personalised, actionable tips tailored to your specific role, skill gaps and career stage.' },
          ].map(f => (
            <div key={f.t} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.t}</div>
              <p className="feat-desc">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}