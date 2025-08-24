import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

export const publicRoutes = [
  {
    path: '/',
    element: LandingPage,
    name: 'Landing',
    exact: true
  },
  {
    path: '/login',
    element: Login,
    name: 'Login'
  },
  {
    path: '/signup',
    element: SignUp,
    name: 'Sign Up'
  }
]

export const privateRoutes = [
  {
    path: '/dashboard',
    element: Dashboard,
    name: 'Dashboard'
  }
]

export const specialRoutes = [
  {
    path: '*',
    element: NotFound,
    name: '404 Not Found'
  }
]

export const allRoutes = [
  ...publicRoutes,
  ...privateRoutes,
  ...specialRoutes
]
