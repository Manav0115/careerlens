import React, { createContext, useContext, useState, useEffect } from 'react'
import type { AuthContextType, User } from '../types'
import api from '../axios'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cl_user')
    const savedToken = localStorage.getItem('cl_token')
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
        setToken(savedToken)
      } catch {
        localStorage.removeItem('cl_user')
        localStorage.removeItem('cl_token')
      }
    }
    setLoading(false)
  }, [])

  const persistSession = (userData: User, tokenValue: string) => {
    setUser(userData)
    setToken(tokenValue)
    localStorage.setItem('cl_user', JSON.stringify(userData))
    localStorage.setItem('cl_token', tokenValue)
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    confirm: string
  ): Promise<void> => {
    if (!name.trim()) throw new Error('Name is required')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error('Invalid email address')
    if (password.length < 8)
      throw new Error('Password must be at least 8 characters')
    if (password !== confirm) throw new Error('Passwords do not match')

    const res = await api.post('/auth/register', { name: name.trim(), email, password })
    const { token: newToken, user: userData } = res.data
    persistSession(userData, newToken)
  }

  const login = async (email: string, password: string): Promise<void> => {
    if (!email || !password) throw new Error('Email and password are required')

    const res = await api.post('/auth/login', { email, password })
    const { token: newToken, user: userData } = res.data
    persistSession(userData, newToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('cl_user')
    localStorage.removeItem('cl_token')
    localStorage.removeItem('cl_results')
    localStorage.removeItem('cl_role')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  }

  // Don't render children until we've checked localStorage
  if (loading) return null

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}