import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="cl-nav">
      <Link to="/" className="cl-logo">
        <div className="cl-logo-icon"><div className="cl-logo-lens"></div></div>
        Career<span>Lens</span>
      </Link>
      <div className="cl-nav-right">
        <Link to="/#how-it-works" className="cl-nav-link">How it works</Link>
        <Link to="/#features"     className="cl-nav-link">Features</Link>
        <Link to="/login"         className="btn-ghost">Login</Link>
        <Link to="/register"      className="btn-primary">Get started</Link>
      </div>
    </nav>
  )
}