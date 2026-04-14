import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Topbar from '../components/shared/Topbar'
import Sidebar from '../components/shared/Sidebar'
import StepBar from '../components/analyse/StepBar'
import UploadZone from '../components/analyse/UploadZone'
import { useAnalysis } from '../context/AnalysisContext'
import api from '../axios'
import type { Analysis } from '../types'
import '../assets/css/global.css'
import '../assets/css/dashboard.css'
import '../assets/css/analyse.css'

export default function Upload() {
  const { selectedRole, selectedFile, setSelectedFile, setResults, addToHistory } =
    useAnalysis()
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!selectedFile || !selectedRole) {
      setError('Please select a file and a job role before continuing.')
      return
    }
    setError('')
    setUploading(true)

    const formData = new FormData()
    formData.append('resume', selectedFile)
    formData.append('role', selectedRole)

    try {
      const res = await api.post('/analyse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const data = res.data

      // Map backend response to frontend Analysis type
      const result: Analysis = {
        role: data.role,
        score: data.score,
        matched: data.matched,
        missing: data.missing,
        date: data.date,
        fileName: data.fileName,
      }

      setResults(result)
      addToHistory({
        role: result.role,
        score: result.score,
        date: result.date,
        matched: result.matched.length,
        missing: result.missing.length,
      })

      navigate('/results')
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { msg?: string } } })?.response?.data
          ?.msg || 'Upload failed. Please try again.'
      setError(message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="db-body an-body">
      <Topbar />
      <StepBar currentStep={2} />

      <div className="db-layout">
        <Sidebar />

        <main
          className="db-main an-main"
          style={{ maxWidth: 860, margin: '0 auto' }}
        >
          <div className="an-header fade-up delay-1">
            <div className="sec-eyebrow">Step 2 of 4</div>
            <h1 className="an-title">Upload your resume</h1>
            <p className="an-sub">
              Analysing for:{' '}
              <span className="an-role-pill">
                {selectedRole ?? 'No role selected'}
              </span>
            </p>
          </div>

          <div className="fade-up delay-2">
            <UploadZone
              onFile={setSelectedFile}
              file={selectedFile}
              onRemove={() => setSelectedFile(null)}
            />
          </div>

          {error && (
            <div
              style={{
                fontSize: 13,
                color: '#E24B4A',
                background: 'rgba(226,75,74,0.1)',
                border: '1px solid rgba(226,75,74,0.2)',
                borderRadius: 8,
                padding: '10px 14px',
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          {/* Tips */}
          <div className="an-tips-wrap fade-up delay-3">
            <div className="an-tips-title">Tips for best results</div>
            <div className="an-tips-grid">
              {[
                {
                  head: 'Use a text-based PDF',
                  body: 'Avoid scanned images — parser works best with selectable text.',
                },
                {
                  head: 'Include a skills section',
                  body: 'Helps extract keywords accurately.',
                },
                {
                  head: 'Keep it under 2 pages',
                  body: 'Concise resumes score higher.',
                },
              ].map((t) => (
                <div key={t.head} className="an-tip-item">
                  <div className="an-tip-icon">✦</div>
                  <div>
                    <div className="an-tip-head">{t.head}</div>
                    <div className="an-tip-body">{t.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="an-cta-row fade-up delay-4">
            <Link
              to="/analyse"
              className="btn-secondary-lg an-back-btn"
              style={{
                width: 'auto',
                minWidth: 140,
                marginTop: 0,
                textDecoration: 'none',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              ← Change role
            </Link>

            <button
              className="btn-primary-lg an-continue-btn"
              disabled={!selectedFile || uploading}
              onClick={handleUpload}
              style={{ width: 'auto', minWidth: 200, marginTop: 0 }}
            >
              {uploading ? 'Analysing...' : 'Analyse my resume →'}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}