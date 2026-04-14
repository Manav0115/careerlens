import type { JobRole } from '../../types'

interface Props {
  role: JobRole
  selected: boolean
  onSelect: (role: string) => void
}

export default function RoleCard({ role, selected, onSelect }: Props) {
  return (
    <div
      className={`an-role-card${selected ? ' selected' : ''}`}
      onClick={() => onSelect(role.role)}
    >
      <div className="an-role-icon">{role.icon}</div>
      <div className="an-role-name">{role.role}</div>
      <div className="an-role-desc">{role.desc}</div>
      <div className="an-role-skills">
        {role.tags.map(tag => (
          <span key={tag} className="an-skill-chip">{tag}</span>
        ))}
      </div>
      {selected && <div className="an-role-check">✓</div>}
    </div>
  )
}