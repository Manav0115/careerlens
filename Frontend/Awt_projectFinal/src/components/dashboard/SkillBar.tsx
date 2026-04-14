import { useEffect, useRef, useState } from 'react'
import type { SkillBarProps } from '../../types'

export default function SkillBar({ label, pct, color, delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), delay * 1000 + 200)
    return () => clearTimeout(timer)
  }, [pct, delay])

  return (
    <div className="db-skill-row">
      <div className="db-skill-head">
        <span>{label}</span>
        <span style={{ color, fontWeight: 500 }}>{pct}%</span>
      </div>
      <div className="db-skill-track">
        <div
          ref={ref}
          className="db-skill-fill"
          style={{ width: `${width}%`, background: color, transition: 'width 1.2s ease' }}
        />
      </div>
    </div>
  )
}