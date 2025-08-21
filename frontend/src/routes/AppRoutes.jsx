import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes, devRoutes, specialRoutes } from './routeConfig'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import LoadingSpinner from '../components/common/Loading'

// Loading component for lazy-loaded routes
const RouteLoader = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
)

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => {
        const Component = route.element
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PublicRoute>
                <Component />
              </PublicRoute>
            }
          />
        )
      })}

      {/* Protected Routes */}
      {privateRoutes.map((route) => {
        const Component = route.element
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <RouteLoader>
                  <Component />
                </RouteLoader>
              </ProtectedRoute>
            }
          />
        )
      })}

      {/* Development Routes (only in development) */}
      {import.meta.env.DEV && devRoutes.map((route) => {
        const Component = route.element
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Component />}
          />
        )
      })}

      {/* Special Routes (404, etc.) */}
      {specialRoutes.map((route) => {
        const Component = route.element
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Component />}
          />
        )
      })}
    </Routes>
  )
}

export default AppRoutes
