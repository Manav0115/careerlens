import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPasswordStrength } from '../utils/helpers'
import '../assets/css/global.css'
import '../assets/css/auth.css'

const STRENGTH_LEVELS = [
  { w: '25%', color: '#E24B4A', label: 'Weak' },
  { w: '50%', color: '#BA7517', label: 'Fair' },
  { w: '75%', color: '#7F77DD', label: 'Good' },
  { w: '100%', color: '#1D9E75', label: 'Strong' },
]

export default function Register() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const strength = password ? STRENGTH_LEVELS[getPasswordStrength(password)] : null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim()) { setError('Name is required.'); return }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.'); return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.'); return
    }
    if (password !== confirm) {
      setError('Passwords do not match.'); return
    }

    setLoading(true)
    try {
      await register(name, email, password, confirm)
      navigate('/dashboard', { replace: true })
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ||
            'Registration failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <nav className="cl-nav">
        <Link to="/" className="cl-logo">
          <div className="cl-logo-icon">
            <div className="cl-logo-lens"></div>
          </div>
          Career<span>Lens</span>
        </Link>
        <div className="cl-nav-right">
          <span className="cl-nav-link">Already have an account?</span>
          <Link to="/login" className="btn-ghost">
            Login
          </Link>
        </div>
      </nav>

      <div className="auth-layout">
        <div className="auth-glow"></div>
        <div className="auth-grid"></div>

        <div className="auth-card cl-card fade-up delay-2">
          <div className="auth-header">
            <span className="auth-icon">✦</span>
            <h1 className="auth-title">Create account</h1>
            <p className="auth-sub">Start analysing your resume for free</p>
          </div>

          {error && (
            <div className="auth-banner error" style={{ display: 'block' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="input-eye"
                  onClick={() => setShowPass((p) => !p)}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
              {strength && (
                <div className="strength-wrap" style={{ display: 'flex' }}>
                  <div className="strength-track">
                    <div
                      className="strength-bar"
                      style={{ width: strength.w, background: strength.color }}
                    />
                  </div>
                  <span
                    className="strength-label"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Confirm password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              className="btn-primary-lg"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create my account →'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login here →</Link>
          </p>
        </div>
      </div>
    </>
  )
}