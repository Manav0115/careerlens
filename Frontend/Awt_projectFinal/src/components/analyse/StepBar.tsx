interface Props {
  currentStep: 1 | 2 | 3 | 4
}

const STEPS = ['Select role', 'Upload resume', 'Analysing', 'Results']

export default function StepBar({ currentStep }: Props) {
  return (
    <div className="an-steps">
      {STEPS.map((label, i) => {
        const stepNum = i + 1
        const isDone   = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <div className={`an-step${isDone ? ' done' : isActive ? ' active' : ''}`}>
              <div className="an-step-num">{isDone ? '✓' : stepNum}</div>
              <div className="an-step-label">{label}</div>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`an-step-line${stepNum < currentStep ? ' active-line' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}