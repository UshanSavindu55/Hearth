import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Card, Label } from '../components/common'
import { MdEmail, MdLock } from 'react-icons/md'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { authAPI } from '../utils/api'
import logo from '../assets/logo.png'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Call the login API
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password
      })

      // Handle successful login
      if (response.token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', response.token)
        
        // Store user data if provided
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user))
        }

        // Navigate to dashboard or home page
        navigate('/dashboard') // Change this to your desired route
      }

    } catch (error) {
      // Handle login errors
      setError(error.message || 'Login failed. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center justify-center">
              <img src={logo} alt="Hearth Logo" className="w-35 h-35 rounded-xl" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-lg font-medium">
            Sign in to continue your mental wellness journey
          </p>
        </div>

        {/* Login Form */}
        <Card rounded = '2xl' className="p-10 bgColor-slate-800 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                leftIcon={<MdEmail className="w-5 h-5" />}
                className="bg-white text-slate-700 placeholder-slate-400 focus:border-slate-800 focus:ring-2 focus:ring-indigo-400/40 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                leftIcon={<MdLock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                }
                className="bg-white text-slate-700 placeholder-slate-400 focus:border-slate-800 focus:ring-2 focus:ring-indigo-400/40 transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800 border-slate-600 bg-slate-700/50 rounded transition-colors"
                />
                <Label htmlFor="remember-me" variant="other" className="ml-3">
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-300 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-slate-300 font-medium">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="font-semibold text-indigo-500 hover:text-indigo-300 transition-colors duration-200 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center pt-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-500 hover:text-slate-400 transition-colors duration-200 font-medium group"
          >
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login