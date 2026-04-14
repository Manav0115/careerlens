import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Sidebar() {
  const { logout } = useAuth()
  const { pathname } = useLocation()

  const navItem = (to: string, icon: string, label: string, badge?: string) => (
    <Link to={to} className={`db-nav-item${pathname === to ? ' active' : ''}`}>
      <span className="db-nav-icon">{icon}</span>
      {label}
      {badge && <span className="db-nav-badge">{badge}</span>}
    </Link>
  )

  return (
    <aside className="db-sidebar">
      <div className="db-sidebar-section">
        <div className="db-sidebar-label">Main</div>
        {navItem('/dashboard',     '◈', 'Dashboard')}
        {navItem('/analyse',       '⊕', 'New analysis', '+')}
        {navItem('/history',       '≡', 'History')}
      </div>
      <div className="db-sidebar-section">
        <div className="db-sidebar-label">Insights</div>
        {navItem('/insights',      '◉', 'AI insights')}
        {navItem('/skills',        '◎', 'Skill gaps')}
        {navItem('/careers',       '→', 'Career paths')}
      </div>
      <div className="db-sidebar-section">
        <div className="db-sidebar-label">Account</div>
        {navItem('/notifications', '🔔', 'Notifications', '2')}
        {navItem('/settings',      '⚙', 'Settings')}
        {navItem('/profile',       '○', 'Profile')}
        <button className="db-nav-item" onClick={logout} style={{ width:'100%', textAlign:'left', background:'none', border:'none', cursor:'pointer' }}>
          <span className="db-nav-icon">⊘</span> Logout
        </button>
      </div>
    </aside>
  )
}