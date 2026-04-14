import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/shared/Footer'
import '../assets/css/global.css'
import '../assets/css/settings.css'

const SECTIONS = ['terms','privacy','cookies','data','contact'] as const
type Section = typeof SECTIONS[number]

export default function Terms() {
  const [active, setActive] = useState<Section>('terms')

  return (
    <>
      <nav className="cl-nav">
        <Link to="/" className="cl-logo">
          <div className="cl-logo-icon"><div className="cl-logo-lens"></div></div>
          Career<span>Lens</span>
        </Link>
        <div className="cl-nav-right">
          <Link to="/" className="btn-ghost">← Home</Link>
        </div>
      </nav>

      <div className="tp-layout">
        <div className="tp-sidebar">
          <div className="tp-sidebar-title">Contents</div>
          {[['terms','Terms of service'],['privacy','Privacy policy'],['cookies','Cookie policy'],['data','Data handling'],['contact','Contact us']].map(([id,label]) => (
            <a key={id} href={`#${id}`} className={`tp-sidebar-link${active===id?' active':''}`}
              onClick={() => setActive(id as Section)}>{label}</a>
          ))}
        </div>

        <div className="tp-content">
          <div className="tp-hero">
            <div className="sec-eyebrow">Legal</div>
            <h1 className="tp-title">Terms &amp; Privacy</h1>
            <p className="tp-sub">Last updated: March 15, 2026 · Effective immediately</p>
          </div>

          <section className="tp-section" id="terms">
            <h2 className="tp-section-title">Terms of service</h2>
            <p className="tp-para">By accessing and using CareerLens, you agree to be bound by these Terms of Service. CareerLens is an AI-powered resume analysis platform designed to help students and job seekers evaluate their resumes against job role requirements.</p>
            <h3 className="tp-sub-title">1. Use of service</h3>
            <p className="tp-para">CareerLens is provided for personal, non-commercial use. You may not misuse the service, attempt to reverse engineer the analysis algorithms, or use automated scripts to interact with the platform.</p>
            <h3 className="tp-sub-title">2. Accuracy of analysis</h3>
            <p className="tp-para">CareerLens provides AI-generated insights for informational purposes only. Results should not be treated as professional career advice. We recommend consulting a career counsellor for personalised guidance.</p>
          </section>

          <div className="tp-divider"></div>

          <section className="tp-section" id="privacy">
            <h2 className="tp-section-title">Privacy policy</h2>
            <p className="tp-para">Your privacy is important to us. This policy explains what data CareerLens collects, how it is used, and your rights regarding that data.</p>
            <h3 className="tp-sub-title">What we collect</h3>
            <p className="tp-para">We collect the information you provide during registration and the resume content you upload for analysis. We also collect anonymised usage data to help us improve the platform.</p>
            <h3 className="tp-sub-title">Data storage</h3>
            <p className="tp-para">In the current version, all data is stored in your browser's local storage and is not transmitted to any external server. Your data exists only on your device.</p>
          </section>

          <div className="tp-divider"></div>

          <section className="tp-section" id="cookies">
            <h2 className="tp-section-title">Cookie policy</h2>
            <p className="tp-para">CareerLens uses minimal browser storage to function correctly. We use localStorage (not cookies) to maintain your login state and store analysis results during your session. We do not use tracking cookies or advertising cookies.</p>
          </section>

          <div className="tp-divider"></div>

          <section className="tp-section" id="data">
            <h2 className="tp-section-title">Data handling</h2>
            <div className="tp-data-grid">
              {[
                { icon:'🔐', title:'Secure by default',  desc:'All data remains on your device. No resume text is transmitted to external servers.' },
                { icon:'🗑️', title:'Right to delete',    desc:'Delete your account and all associated data at any time from the Profile page.' },
                { icon:'📤', title:'Data portability',   desc:'Export all your analysis history and results as a JSON file from Settings.' },
                { icon:'🚫', title:'No data selling',    desc:'We never sell, rent or share your personal data with advertisers or third parties.' },
              ].map(d => (
                <div key={d.title} className="tp-data-card">
                  <div className="tp-data-icon">{d.icon}</div>
                  <div className="tp-data-title">{d.title}</div>
                  <div className="tp-data-desc">{d.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="tp-divider"></div>

          <section className="tp-section" id="contact">
            <h2 className="tp-section-title">Contact us</h2>
            <p className="tp-para">For questions about these policies or your data rights, please reach out to us:</p>
            <div className="tp-contact-grid">
              {[['Email','support@careerlens.in'],['Response time','Within 48 hours'],['Built by','CareerLens Team, India']].map(([l,v]) => (
                <div key={l} className="tp-contact-item">
                  <div className="tp-contact-label">{l}</div>
                  <div className="tp-contact-val">{v}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  )
}