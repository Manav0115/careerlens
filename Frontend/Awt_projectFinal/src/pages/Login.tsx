import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../assets/css/global.css'
import '../assets/css/auth.css'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ||
            'Login failed. Please try again.'
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
          <span className="cl-nav-link">Don't have an account?</span>
          <Link to="/register" className="btn-primary">
            Register
          </Link>
        </div>
      </nav>

      <div className="auth-layout">
        <div className="auth-glow"></div>
        <div className="auth-grid"></div>

        <div className="auth-card cl-card fade-up delay-2">
          <div className="auth-header">
            <span className="auth-icon">🔍</span>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-sub">Login to continue your career analysis</p>
          </div>

          {error && (
            <div className="auth-banner error" style={{ display: 'block' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
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
              <label className="form-label">
                Password
                <Link to="/forgot" className="forgot-link">
                  Forgot password?
                </Link>
              </label>
              <div className="input-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Your password"
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
            </div>
            <button
              type="submit"
              className="btn-primary-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to CareerLens →'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>
          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register">Create one free →</Link>
          </p>
        </div>
      </div>
    </>
  )
}