import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken')
    return !!token
  }

  if (isAuthenticated()) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default PublicRoute
