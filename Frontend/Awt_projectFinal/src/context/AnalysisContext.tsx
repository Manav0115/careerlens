import React, { createContext, useContext, useState } from 'react'
import type { AnalysisContextType, Analysis, HistoryItem } from '../types'

const AnalysisContext = createContext<AnalysisContextType | null>(null)

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [selectedRole, setSelectedRole] = useState<string | null>(() =>
    localStorage.getItem('cl_role')
  )
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [results, setResultsState] = useState<Analysis | null>(() => {
    try {
      const raw = localStorage.getItem('cl_results')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const raw = localStorage.getItem('cl_history')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  function handleSetRole(role: string) {
    setSelectedRole(role)
    localStorage.setItem('cl_role', role)
  }

  function setResults(r: Analysis) {
    setResultsState(r)
    localStorage.setItem('cl_results', JSON.stringify(r))
  }

  function addToHistory(item: HistoryItem) {
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 10)
      localStorage.setItem('cl_history', JSON.stringify(updated))
      return updated
    })
  }

  const value: AnalysisContextType = {
    selectedRole,
    setSelectedRole: handleSetRole,
    selectedFile,
    setSelectedFile,
    results,
    setResults,
    history,
    addToHistory,
  }

  return (
    <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
  )
}

export function useAnalysis(): AnalysisContextType {
  const ctx = useContext(AnalysisContext)
  if (!ctx) throw new Error('useAnalysis must be used inside AnalysisProvider')
  return ctx
}