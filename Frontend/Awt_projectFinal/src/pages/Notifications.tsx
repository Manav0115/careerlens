import { useState } from 'react'
import Topbar  from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import type { Notification } from '../types'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/inner.css'
import '../assets/css/settings.css'

const DEMO: Notification[] = [
  { id:1, type:'analysis', read:false, icon:'◈', iconClass:'nt-icon-purple', title:'Analysis complete — DevOps Engineer', desc:'Your resume scored 72% for DevOps Engineer. You matched 6 out of 10 skills. View your full report.', time:'Today, 9:46 PM', link:'/results' },
  { id:2, type:'tips',     read:false, icon:'✦', iconClass:'nt-icon-amber',  title:'Tip: Add a dedicated Skills section',   desc:'Resumes with a clearly labelled Skills section score 40% higher with ATS systems.', time:'Today, 8:00 AM', link:'/skills' },
  { id:3, type:'analysis', read:true,  icon:'◈', iconClass:'nt-icon-purple', title:'Analysis complete — Backend Developer',  desc:'Your resume scored 78% for Backend Developer. Great result!', time:'Mar 10, 2026', link:'/history' },
  { id:4, type:'tips',     read:true,  icon:'◉', iconClass:'nt-icon-green',  title:'Weekly tip: Quantify your impact',       desc:'Recruiters respond 3× more to resumes that show measurable impact.', time:'Mar 9, 2026', link:'/insights' },
  { id:5, type:'system',   read:true,  icon:'○', iconClass:'nt-icon-blue',   title:'New role added: Cybersecurity Engineer', desc:'CareerLens now supports Cybersecurity Engineer analysis.', time:'Mar 8, 2026', link:'/analyse' },
]

type FilterType = 'all' | 'unread' | 'analysis' | 'tips'

export default function Notifications() {
  const [notifs,  setNotifs]  = useState<Notification[]>(DEMO)
  const [filter,  setFilter]  = useState<FilterType>('all')

  const unreadCount = notifs.filter(n => !n.read).length

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  function openNotif(id: number) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const filtered = notifs.filter(n => {
    if (filter === 'unread')   return !n.read
    if (filter === 'analysis') return n.type === 'analysis'
    if (filter === 'tips')     return n.type === 'tips'
    return true
  })

  return (
    <div className="db-body">
      <Topbar />
      <div className="db-layout">
        <Sidebar />
        <main className="db-main">

          <div className="in-page-header fade-up delay-1">
            <div>
              <h1 className="in-page-title">Notifications</h1>
              <p className="in-page-sub">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
            </div>
            {unreadCount > 0 && (
              <button className="btn-ghost" onClick={markAllRead}>Mark all read</button>
            )}
          </div>

          <div className="nt-filter-pills fade-up delay-2" style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
            {(['all','unread','analysis','tips'] as FilterType[]).map(f => (
              <button key={f} className={`in-filter-pill${filter===f?' active':''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="db-panel fade-up delay-2">
            {filtered.length === 0 && (
              <div className="in-empty-state">
                <div className="in-empty-icon">◉</div>
                <div className="in-empty-title">No notifications</div>
                <div className="in-empty-sub">You're all caught up. Start an analysis to receive insights.</div>
              </div>
            )}
            {filtered.map(n => (
              <div
                key={n.id}
                className={`nt-item${n.read ? '' : ' unread'}`}
                onClick={() => openNotif(n.id)}
              >
                <div className={`nt-icon ${n.iconClass}`}>{n.icon}</div>
                <div className="nt-body">
                  <div className="nt-title">{n.title}</div>
                  <div className="nt-desc">{n.desc}</div>
                  <div className="nt-time">{n.time}</div>
                </div>
                {!n.read && <div className="nt-unread-dot"></div>}
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}