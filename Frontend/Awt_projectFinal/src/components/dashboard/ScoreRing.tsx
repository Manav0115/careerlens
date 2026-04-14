interface Props {
  score: number
  size?: number
}

export default function ScoreRing({ score, size = 90 }: Props) {
  const r           = (size / 2) - 6
  const circ        = 2 * Math.PI * r
  const offset      = circ - (score / 100) * circ

  return (
    <div className="db-score-ring" style={{ width: size, height: size, background: 'none' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#1C1C2A" strokeWidth="10"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#7F77DD" strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1.4s ease' }}
        />
      </svg>
      <div className="db-score-inner" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div className="db-score-num">{score}%</div>
        <div className="db-score-lbl">MATCH</div>
      </div>
    </div>
  )
}