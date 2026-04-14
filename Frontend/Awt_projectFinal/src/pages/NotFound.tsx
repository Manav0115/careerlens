import { Link } from 'react-router-dom'
import '../assets/css/global.css'
import '../assets/css/settings.css'

export default function NotFound() {
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

      <div className="err-layout">
        <div className="err-glow"></div>
        <div className="err-grid"></div>
        <div className="err-card fade-up delay-2">
          <div className="err-code">404</div>
          <h1 className="err-title">Page not found</h1>
          <p className="err-desc">The page you're looking for doesn't exist or may have been moved. Let's get you back on track.</p>
          <div className="err-actions">
            <Link to="/"          className="btn-primary-lg err-btn">← Go to homepage</Link>
            <Link to="/dashboard" className="btn-secondary-lg err-btn">Go to dashboard</Link>
          </div>
          <div className="err-links">
            <span className="err-links-label">Or visit:</span>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/analyse">New analysis</Link>
            <Link to="/history">History</Link>
          </div>
        </div>
      </div>
    </>
  )
}