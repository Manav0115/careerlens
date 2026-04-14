import type { SkillTagProps } from '../../types'

export default function SkillTag({ skill, matched, delay = 0 }: SkillTagProps) {
  return (
    <span
      className={`skill-tag ${matched ? 'tag-match' : 'tag-miss'}`}
      style={{ animation: `tagPop 0.4s ${delay}s ease both` }}
    >
      {skill} {matched ? '✓' : '✗'}
    </span>
  )
}