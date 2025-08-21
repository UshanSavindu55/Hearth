import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Card, Label } from '../components/common'
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail, MdLock } from 'react-icons/md'
import { authAPI } from '../utils/api'
import logo from '../assets/logo.png'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      // Call the register API
      const response = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })

      // Handle successful registration
      if (response.token) {
        // Store the token in localStorage
        localStorage.setItem('authToken', response.token)
        
        // Store user data if provided
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user))
        }

        // Navigate to dashboard or show success message
        navigate('/dashboard') // Change this to your desired route
      } else {
        // If no token, redirect to login page
        navigate('/login')
      }

    } catch (error) {
      // Handle registration errors
      if (error.message.includes('email')) {
        setErrors({ email: 'Email is already in use' })
      } else if (error.message.includes('username')) {
        setErrors({ username: 'Username is already taken' })
      } else {
        setErrors({ general: error.message || 'Registration failed. Please try again.' })
      }
      console.error('Registration error:', error)
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
            Join Hearth
          </h2>
          <p className="text-slate-400 text-lg font-medium">
            Start your mental wellness journey today
          </p>
        </div>

        {/* Sign Up Form */}
        <Card rounded='2xl' className="p-10 bgColor-slate-800 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errors.general}</span>
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                leftIcon={<FaUser className="w-4 h-4" />}
                className="bg-white text-slate-700 placeholder-slate-400 focus:border-slate-800 focus:ring-2 focus:ring-indigo-400/40 transition-all duration-200 backdrop-blur-sm"
              />
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">{errors.username}</p>
              )}
            </div>

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
                placeholder="john.doe@example.com"
                leftIcon={<MdEmail className="w-5 h-5" />}
                className="bg-white text-slate-700 placeholder-slate-400 focus:border-slate-800 focus:ring-2 focus:ring-indigo-400/40 transition-all duration-200 backdrop-blur-sm"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
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
                placeholder="Create a strong password"
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
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
              <p className="text-slate-500 text-xs mt-1">Must be at least 8 characters long</p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                leftIcon={<MdLock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                }
                className="bg-white text-slate-700 placeholder-slate-400 focus:border-slate-800 focus:ring-2 focus:ring-indigo-400/40 transition-all duration-200 backdrop-blur-sm"
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start pt-2">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800 border-slate-600 bg-slate-700/50 rounded transition-colors mt-1"
              />
              <div className="ml-3">
                <Label htmlFor="agreeToTerms" variant="other" className="text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-indigo-500 hover:text-indigo-300 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-indigo-500 hover:text-indigo-300 underline">
                    Privacy Policy
                  </a>
                </Label>
                {errors.agreeToTerms && (
                  <p className="text-red-400 text-xs mt-1">{errors.agreeToTerms}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading || !formData.agreeToTerms}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-slate-300 font-medium">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-indigo-500 hover:text-indigo-300 transition-colors duration-200 hover:underline"
            >
              Sign in here
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

export default SignUp
