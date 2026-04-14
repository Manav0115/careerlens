import { useRef, useState } from 'react'
import { formatBytes } from '../../utils/helpers'

interface Props {
  onFile: (file: File) => void
  file: File | null
  onRemove: () => void
}

const ALLOWED = ['application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

export default function UploadZone({ onFile, file, onRemove }: Props) {
  const inputRef              = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [error,    setError]    = useState('')

  function validate(f: File): boolean {
    if (!ALLOWED.includes(f.type) && !f.name.match(/\.(pdf|doc|docx)$/i)) {
      setError('Please upload a PDF, DOC, or DOCX file.'); return false
    }
    if (f.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.'); return false
    }
    setError('')
    return true
  }

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f && validate(f)) onFile(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f && validate(f)) onFile(f)
  }

  return (
    <div className="an-upload-wrap">
      {!file ? (
        <div
          className={`an-upload-zone${dragOver ? ' drag-over' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="an-upload-icon">📄</div>
          <div className="an-upload-title">Click to upload or drag &amp; drop</div>
          <div className="an-upload-formats">PDF, DOC, DOCX supported · Max 5MB</div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            onChange={handleSelect}
          />
        </div>
      ) : (
        <div className="an-file-preview" style={{ display: 'flex' }}>
          <div className="an-file-icon">📎</div>
          <div className="an-file-info">
            <div className="an-file-name">{file.name}</div>
            <div className="an-file-size">{formatBytes(file.size)}</div>
          </div>
          <div className="an-file-status">
            <span className="an-file-ok">✓ Ready to analyse</span>
          </div>
          <button className="an-file-remove" onClick={onRemove} title="Remove">✕</button>
        </div>
      )}
      {error && (
        <div style={{ fontSize: 12, color: '#E24B4A', marginTop: 8 }}>{error}</div>
      )}
    </div>
  )
}