import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/helpers'

export default function Topbar() {
  const { user } = useAuth()
  const initials  = user ? getInitials(user.name) : 'CL'

  return (
    <header className="db-topbar">
      <Link to="/" className="cl-logo">
        <div className="cl-logo-icon"><div className="cl-logo-lens"></div></div>
        Career<span>Lens</span>
      </Link>
      <div className="db-topbar-right">
        <Link to="/notifications" className="db-notif-btn" title="Notifications">
          🔔<span className="db-notif-dot"></span>
        </Link>
        <Link to="/settings" className="btn-ghost db-settings-link">⚙ Settings</Link>
        <Link to="/analyse" className="btn-primary db-new-btn">+ New analysis</Link>
        <Link to="/profile" className="db-avatar">{initials}</Link>
      </div>
    </header>
  )
}