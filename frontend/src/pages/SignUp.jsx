import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Card, Label, SuccessModal } from '../components/common'
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdEmail, MdLock } from 'react-icons/md'
import { authAPI } from '../api'
import { validateSignupForm, hasValidationErrors } from '../utils/validation'
import logo from '../assets/logo.png'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successData, setSuccessData] = useState({
    title: '',
    message: '',
    action: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })

    // Clearing specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateSignupForm(formData)
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setErrors({})

    try {
      // Calling the register API
      const response = await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })

      // Handle successful registration
      if (response.action === 'signup' && response.message) {
        // Store backend response data
        console.log('Backend response:', response)
        setSuccessData({
          title: 'Registration Successful!',
          message: response.message,
          action: response.action
        })
        // Show success modal
        setShowSuccessModal(true)
      } else {
        // Unexpected response format
        setErrors({ general: 'Registration completed but received unexpected response.' })
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

  const handleSuccessModalClose = () => {
    console.log('Closing success modal')
    setShowSuccessModal(false)
    navigate('/login')
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
          {showSuccessModal ? (
            /* Success Message Component */
            <SuccessModal
              isOpen={showSuccessModal}
              onClose={handleSuccessModalClose}
              title={successData.title}
              subtitle="Welcome to Hearth!"
              message={`${successData.message} You can now sign in with your credentials to start your journey.`}
              buttonText="Continue to Login"
              buttonAction={handleSuccessModalClose}
            />
          ) : (
            /* Signup Form */
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-50 border-b border-red-500 text-red-600 px-4 py-3" role="alert">
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
                placeholder="Enter Your Password"
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
              <p className="text-slate-500 text-xs mt-1">Must be at least 6 characters long</p>
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

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
            </div>
          </form>
          )}
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
