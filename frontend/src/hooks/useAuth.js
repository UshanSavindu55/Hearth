import { useState, useEffect, useContext, createContext } from 'react'
import { authAPI } from '../api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const userData = localStorage.getItem('user')

        if (token && userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      setError('')
      setLoading(true)
      
      const response = await authAPI.login(credentials)
      
      if (response.token) {
        localStorage.setItem('authToken', response.token)
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user))
          setUser(response.user)
        }
        return { success: true }
      }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setError('')
      setLoading(true)
      
      const response = await authAPI.register(userData)
      
      if (response.token) {
        localStorage.setItem('authToken', response.token)
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user))
          setUser(response.user)
        }
        return { success: true }
      }
    } catch (error) {
      setError(error.message)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    setError('')
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default useAuth
