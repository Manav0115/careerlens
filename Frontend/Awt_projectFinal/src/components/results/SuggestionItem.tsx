import type { SuggestionItem as SI } from '../../types'

const PILL_MAP = {
  high:   { cls: 'pill-high', label: 'High priority'   },
  medium: { cls: 'pill-med',  label: 'Medium priority' },
  low:    { cls: 'pill-low',  label: 'Quick win'       },
}

export default function SuggestionItem({ icon, iconClass, title, desc, priority }: SI) {
  const pill = PILL_MAP[priority]
  return (
    <div className="db-sug-item">
      <div className={`db-sug-icon ${iconClass}`}>{icon}</div>
      <div>
        <div className="db-sug-title">{title}</div>
        <div className="db-sug-desc">{desc}</div>
        <span className={`db-pill ${pill.cls}`}>{pill.label}</span>
      </div>
    </div>
  )
}