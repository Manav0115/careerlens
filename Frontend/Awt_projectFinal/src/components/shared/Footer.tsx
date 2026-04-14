import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="cl-footer">
      <div className="cl-footer-logo">Career<span>Lens</span></div>
      <div className="cl-footer-copy">© 2026 CareerLens. All rights reserved.</div>
      <div className="cl-footer-links">
        <Link to="/#about">About</Link>
        <Link to="/#contact">Contact</Link>
        <Link to="/terms">Terms &amp; Privacy</Link>
      </div>
    </footer>
  )
}