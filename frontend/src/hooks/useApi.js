import { useState, useEffect, useCallback } from 'react'

// Custom hook for handling API calls with loading states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction(...params)
      setData(result)
      return result
    } catch (err) {
      setError(err.message || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, dependencies)

  return {
    data,
    loading,
    error,
    execute,
    reset: () => {
      setData(null)
      setError(null)
      setLoading(false)
    }
  }
}

// Hook for immediate API calls
export const useApiCall = (apiFunction, dependencies = []) => {
  const { data, loading, error, execute } = useApi(apiFunction, dependencies)

  useEffect(() => {
    execute()
  }, [execute])

  return { data, loading, error, refetch: execute }
}

export default useApi
