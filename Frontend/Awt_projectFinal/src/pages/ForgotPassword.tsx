import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/global.css'
import '../assets/css/auth.css'
import '../assets/css/settings.css'

export default function ForgotPassword() {
  const [email, setEmail]   = useState('')
  const [sent,  setSent]    = useState(false)
  const [error, setError]   = useState('')
  const [resent, setResent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) { setError('Please enter a valid email address.'); return }
    setError('')
    setSent(true)
  }

  return (
    <>
      <nav className="cl-nav">
        <Link to="/" className="cl-logo">
          <div className="cl-logo-icon"><div className="cl-logo-lens"></div></div>
          Career<span>Lens</span>
        </Link>
        <div className="cl-nav-right">
          <Link to="/login" className="btn-ghost">← Back to login</Link>
        </div>
      </nav>

      <div className="auth-layout">
        <div className="auth-glow"></div>
        <div className="auth-grid"></div>

        {!sent ? (
          <div className="auth-card cl-card fade-up delay-2">
            <div className="auth-header">
              <span className="auth-icon">🔑</span>
              <h1 className="auth-title">Forgot password</h1>
              <p className="auth-sub">Enter your email and we'll send a reset link</p>
            </div>
            {error && <div className="auth-banner error">{error}</div>}
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">Email address</label>
                <input type="email" className="form-input" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary-lg">Send reset link →</button>
            </form>
            <div className="auth-divider"><span>or</span></div>
            <p className="auth-switch">Remember your password? <Link to="/login">Login →</Link></p>
          </div>
        ) : (
          <div className="auth-card cl-card fade-up delay-2">
            <div className="auth-header">
              <span className="auth-icon">📬</span>
              <h1 className="auth-title">Check your inbox</h1>
              <p className="auth-sub">We've sent a reset link to <strong style={{ color: '#AFA9EC' }}>{email}</strong></p>
            </div>
            <div className="fp-sent-info">
              {['Open the email from CareerLens','Click the reset link inside','Set your new password and log in'].map((t,i) => (
                <div key={i} className="fp-sent-item">
                  <div className="fp-sent-num">{i+1}</div>
                  <div className="fp-sent-text">{t}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#6B6A80', textAlign: 'center', marginTop: 12 }}>
              Didn't get it?{' '}
              <span style={{ color: '#7F77DD', cursor: 'pointer' }} onClick={() => setResent(true)}>
                Resend email
              </span>
              {resent && <span style={{ color: '#1D9E75', marginLeft: 8 }}>Sent!</span>}
            </div>
            <div className="auth-divider"><span>or</span></div>
            <div className="fp-demo-note">
              <div className="fp-demo-title">Demo mode</div>
              <div className="fp-demo-desc">This is a frontend demo. To reset your password go to your Profile page after logging in.</div>
              <Link to="/login" className="btn-primary-lg" style={{ display:'block', textAlign:'center', marginTop: 10, textDecoration:'none' }}>
                Back to login →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}