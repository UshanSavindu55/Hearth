import { publicRoutes, privateRoutes, specialRoutes, allRoutes } from './routeConfig'

export { default as AppRoutes } from './AppRoutes'
export { default as ProtectedRoute } from './ProtectedRoute'
export { default as PublicRoute } from './PublicRoute'
export { publicRoutes, privateRoutes, specialRoutes, allRoutes }

export const getRouteByName = (name) => {
  return allRoutes.find(route => route.name === name)
}

export const getRouteByPath = (path) => {
  return allRoutes.find(route => route.path === path)
}

export const isPublicRoute = (path) => {
  return publicRoutes.some(route => route.path === path)
}

export const isPrivateRoute = (path) => {
  return privateRoutes.some(route => route.path === path)
}
