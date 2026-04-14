import type { StatCardProps } from '../../types'

export default function StatCard({ icon, value, label, delta, deltaType, delay = 0 }: StatCardProps) {
  return (
    <div className="db-stat-card fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="db-stat-icon">{icon}</div>
      <div className="db-stat-val">{value}</div>
      <div className="db-stat-lbl">{label}</div>
      {delta && (
        <div className={`db-stat-delta ${deltaType === 'up' ? 'delta-up' : 'delta-down'}`}>
          {deltaType === 'up' ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  )
}