import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card, Label } from '../components/common'
import logo from '../assets/logo.png'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement actual login logic here
    console.log('Login attempt:', formData)
    // This would typically call an API endpoint
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
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Sign In
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