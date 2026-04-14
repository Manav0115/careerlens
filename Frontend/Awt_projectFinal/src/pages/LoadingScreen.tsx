import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StepBar from '../components/analyse/StepBar'
import { useAnalysis } from '../context/AnalysisContext'
import { buildResults } from '../utils/helpers'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/analyse.css'

const STEPS = [
  { label: 'Extracting resume text', pct: 20 },
  { label: 'Identifying skills & keywords', pct: 40 },
  { label: 'Comparing with role requirements', pct: 60 },
  { label: 'Running match algorithm', pct: 80 },
  { label: 'Generating AI suggestions', pct: 100 },
]
const CIRC = 2 * Math.PI * 44

export default function LoadingScreen() {
  const { selectedRole, selectedFile, setResults, addToHistory } = useAnalysis()
  const navigate = useNavigate()
  const [pct, setPct] = useState(0)
  const [step, setStep] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!selectedRole) {
      navigate('/analyse', { replace: true })
      return
    }

    const interval = setInterval(() => {
      setPct((prev) => {
        const next = prev + 1
        // Find current step index
        const idx = STEPS.findIndex((s) => next <= s.pct)
        setStep(idx === -1 ? STEPS.length - 1 : idx)

        if (next >= 100 && !doneRef.current) {
          doneRef.current = true
          clearInterval(interval)
          const result = buildResults(
            selectedRole,
            selectedFile?.name ?? 'resume.pdf'
          )
          setResults(result)
          addToHistory({
            role: result.role,
            score: result.score,
            date: result.date,
            matched: result.matched.length,
            missing: result.missing.length,
          })
          setTimeout(() => navigate('/results'), 600)
        }
        return next
      })
    }, 40)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const offset = CIRC - (pct / 100) * CIRC

  return (
    <div className="db-body an-body">
      <header className="db-topbar">
        <span className="cl-logo">
          <div className="cl-logo-icon">
            <div className="cl-logo-lens"></div>
          </div>
          Career<span>Lens</span>
        </span>
      </header>
      <StepBar currentStep={3} />

      <main className="an-main an-loading-main">
        <div className="an-loading-wrap fade-up delay-1">
          <div className="an-loading-ring">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#1C1C2A"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#7F77DD"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <div className="an-loading-ring-inner">
              <span className="an-loading-pct">{pct}%</span>
            </div>
          </div>

          <h1 className="an-loading-title">Analysing your resume</h1>
          <p className="an-loading-step">{STEPS[step]?.label}...</p>

          <div className="an-loading-steps">
            {STEPS.map((s, i) => {
              const isDone = pct > s.pct
              const isActive = !isDone && pct > (STEPS[i - 1]?.pct ?? 0)
              return (
                <div
                  key={s.label}
                  className={`an-check-item${isDone ? ' done' : isActive ? ' active' : ''}`}
                >
                  <div
                    className={`an-check-dot${isDone ? ' complete' : isActive ? ' active' : ' pending'}`}
                  ></div>
                  <span>{s.label}</span>
                </div>
              )
            })}
          </div>

          <div className="an-loading-meta">
            Analysing for: <strong>{selectedRole}</strong>
          </div>
        </div>
      </main>
    </div>
  )
}